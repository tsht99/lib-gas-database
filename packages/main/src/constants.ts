/**
 * 各種の操作タイプを表す定数オブジェクトです。
 * @property CREATE 'create'文字列を表します。オブジェクトがCreate型であることを示します。
 * @property READ 'read'文字列を表します。オブジェクトがRead型であることを示します。
 * @property UPDATE 'update'文字列を表します。オブジェクトがUpdate型であることを示します。
 * @property DELETE 'delete'文字列を表します。オブジェクトがDelete型であることを示します。
 */
export const TYPE = {
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
}

/**
 * 操作が成功したときに返すメッセージです。
 */
export const SUCCESS_MESSAGE = 'Success'

/**
 * 各種のエラーメッセージを表す定数オブジェクトです。
 */
export const ERROR_MESSAGES = {
    // Table.ts
    TABLE_NOT_FOUND: 'シートが見つかりませんでした',
    RECORD_NOT_FOUND: 'レコードが見つかりませんでした',

    // doPost.ts
    UNEXPECTED_ERROR: '予期しないエラーが発生しました',
    MISSING_PAYLOAD: 'ペイロードを指定してください',
    INVALID_JSON: 'ペイロードを JSON としてパースできませんでした',
    INVALID_PAYLOAD: 'ペイロードはオブジェクトにしてください',
    MISSING_API_KEY: 'API キーを指定してください',
    INVALID_API_KEY: 'API キーは文字列で指定してください',
    UNREGISTERED_API_KEY: 'API キーを登録してください',
    DATABASE_LOCK_FAILED: 'データベースのロックに失敗しました',
    INVALID_TYPE_PROPERTY: "type プロパティに 'create', 'read', 'update', 'delete' のいずれかを指定してください",

    // typeGuard.ts
    INVALID_RECORDS: 'レコードの配列を指定してください',
    MISSING_INDEX: 'インデックスを指定してください',
}

/**
 * ドキュメントがロックができない場合の待ち時間です。
 */
export const TIMEOUT_IN_MILLIS = 10 * 1000
