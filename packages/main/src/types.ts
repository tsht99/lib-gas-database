import { TYPE } from './constants'

/**
 * Create操作を表す型です。
 * @property type 操作のタイプを表します。常にTYPE.CREATEとなります。
 * @property records Create操作で作成するレコードの配列を表します。
 */
export type Create = Record<string, unknown> & {
    type: typeof TYPE.CREATE
    records: unknown[]
}

/**
 * Read操作を表す型です。
 * @property type 操作のタイプを表します。常にTYPE.READとなります。
 */
export type Read = Record<string, unknown> & {
    type: typeof TYPE.READ
}

/**
 * Update操作を表す型です。
 * @property type 操作のタイプを表します。常にTYPE.UPDATEとなります。
 * @property record Update操作で更新するレコードを表します。
 * @property index 更新するレコードのインデックスを表します。
 */
export type Update = Record<string, unknown> & {
    type: typeof TYPE.UPDATE
    record: unknown
    index: number
}

/**
 * Delete操作を表す型です。
 * @property type 操作のタイプを表します。常にTYPE.DELETEとなります。
 * @property index 削除するレコードのインデックスを表します。
 */
export type Delete = Record<string, unknown> & {
    type: typeof TYPE.DELETE
    index: number
}

/**
 * レスポンスペイロードを表す型です。
 * @property isError エラーが発生したかどうかを表します。エラーが発生した場合はtrue、そうでない場合はfalseです。
 * @property message レスポンスメッセージを表します。成功またはエラーメッセージが含まれます。
 * @property records? レコードの配列を表します。Read操作のレスポンスで使用されます。
 * @property errorStack? エラースタックを表します。エラーが発生した場合に使用されます。
 */
export type Payload = {
    isError: boolean
    message: string
    records?: any[]
    errorStack?: string
}
