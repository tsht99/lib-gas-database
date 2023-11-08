import { toTextOutput } from '@tsht99/lib-gas-utils'

import { Table } from './Table'
import { ERROR_MESSAGES, SUCCESS_MESSAGE, TIMEOUT_IN_MILLIS } from './constants'
import { isCreate, isDelete, isRead, isUpdate } from './typeGuard'
import type { Payload } from './types'
import { isObject } from './utils'

/**
 * Google Apps ScriptのDoPostイベントを処理します。
 * @param event doPostイベントオブジェクト
 * @param sheetName - 処理対象のシート名
 * @returns レスポンスとして返すテキスト出力
 * @throws イベントパラメータが不正な場合、または処理中に予期しないエラーが発生した場合にエラーをスローします。
 */
export const doPost = (
    event: GoogleAppsScript.Events.DoPost,
    sheetName: string
): GoogleAppsScript.Content.TextOutput => {
    let adminApiKey: string | undefined
    let targetApiKey: unknown

    const isAdminApiKey = () => {
        // 空文字は false
        if (!!adminApiKey && adminApiKey === targetApiKey) return true
        return false
    }

    try {
        const contents = (() => {
            // event.postData は undefined のときがある
            const text = event.postData?.contents as string | undefined
            if (text === undefined) throw new Error(ERROR_MESSAGES.MISSING_PAYLOAD)
            const parsedText = (() => {
                try {
                    return JSON.parse(text) as unknown
                } catch (error) {
                    if (error instanceof Error) throw new Error(ERROR_MESSAGES.INVALID_JSON)
                    throw error
                }
            })()
            if (!isObject(parsedText) || Array.isArray(parsedText)) throw new Error(ERROR_MESSAGES.INVALID_PAYLOAD)
            return parsedText
        })()

        // 認証
        const hasAuthority = (() => {
            targetApiKey = contents?.apiKey
            if (!targetApiKey) throw new Error(ERROR_MESSAGES.MISSING_API_KEY)
            adminApiKey = process.env.ADMIN_API_KEY
            const userApiKeys = process.env.USER_API_KEYS?.split('\n').filter((apiKey) => apiKey !== '')
            if (typeof targetApiKey !== 'string') throw new Error(ERROR_MESSAGES.INVALID_API_KEY)
            if (isAdminApiKey() || userApiKeys?.includes(targetApiKey)) return true
            return false
        })()
        if (!hasAuthority) throw new Error(ERROR_MESSAGES.UNREGISTERED_API_KEY)

        // CRUD 操作
        const result = (() => {
            const table = new Table(sheetName)

            // 排他制御
            const lock = LockService.getDocumentLock()
            const isSuccessfullyLocked = lock.tryLock(TIMEOUT_IN_MILLIS)
            if (!isSuccessfullyLocked) throw new Error(ERROR_MESSAGES.DATABASE_LOCK_FAILED)
            try {
                if (isCreate(contents)) table.create(contents.records)
                else if (isRead(contents)) return { records: table.read() }
                else if (isUpdate(contents)) table.update(contents.record, contents.index)
                else if (isDelete(contents)) table.delete(contents.index)
                else throw new Error(ERROR_MESSAGES.INVALID_TYPE_PROPERTY)
            } finally {
                lock.releaseLock()
            }

            return {}
        })()

        const payload: Payload = { isError: false, message: SUCCESS_MESSAGE, ...result }
        return toTextOutput(JSON.stringify(payload))
    } catch (error) {
        const payload: Payload = (() => {
            if (error instanceof Error) {
                if (isAdminApiKey()) return { isError: true, message: error.message, errorStack: error.stack }
                return { isError: true, message: error.message }
            }
            if (isAdminApiKey()) return { isError: true, message: error as unknown as string }
            return { isError: true, message: ERROR_MESSAGES.UNEXPECTED_ERROR }
        })()
        return toTextOutput(JSON.stringify(payload))
    }
}
