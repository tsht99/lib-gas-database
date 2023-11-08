import { ERROR_MESSAGES, TYPE } from './constants'
import { Create, Delete, Read, Update } from './types'

/**
 * オブジェクトがCreate型であるかを判定します。
 * @param object 判定対象のオブジェクト
 * @returns オブジェクトがCreate型であればtrue、そうでなければfalse
 * @throws ERROR_MESSAGES.INVALID_RECORDS オブジェクトのrecordsプロパティが配列でない場合にスローされます。
 */
export const isCreate = (object: Record<string, unknown>): object is Create => {
    if (object.type === TYPE.CREATE) {
        if (Array.isArray(object.records)) return true
        throw new Error(ERROR_MESSAGES.INVALID_RECORDS)
    }
    return false
}

/**
 * オブジェクトがRead型であるかを判定します。
 * @param object 判定対象のオブジェクト
 * @returns オブジェクトがRead型であればtrue、そうでなければfalse
 */
export const isRead = (object: Record<string, unknown>): object is Read => {
    return object.type === TYPE.READ
}

/**
 * オブジェクトがUpdate型であるかを判定します。
 * @param object 判定対象のオブジェクト
 * @returns オブジェクトがUpdate型であればtrue、そうでなければfalse
 * @throws ERROR_MESSAGES.MISSING_INDEX オブジェクトのindexプロパティが数値でない場合にスローされます。
 */
export const isUpdate = (object: Record<string, unknown>): object is Update => {
    if (object.type === TYPE.UPDATE) {
        if (typeof object.index === 'number') return true
        throw new Error(ERROR_MESSAGES.MISSING_INDEX)
    }
    return false
}

/**
 * オブジェクトがUpdate型であるかを判定します。
 * @param object 判定対象のオブジェクト
 * @returns オブジェクトがUpdate型であればtrue、そうでなければfalse
 * @throws ERROR_MESSAGES.MISSING_INDEX オブジェクトのindexプロパティが数値でない場合にスローされます。
 */
export const isDelete = (object: Record<string, unknown>): object is Delete => {
    if (object.type === TYPE.DELETE) {
        if (typeof object.index === 'number') return true
        throw new Error(ERROR_MESSAGES.MISSING_INDEX)
    }
    return false
}
