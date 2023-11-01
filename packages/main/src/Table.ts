import { setValuesToSheetRange } from '@tsht99/lib-gas-utils'

/**
 * シートで作成したテーブル
 */
export class Table {
    /**
     * テーブル名
     */
    public readonly name

    /**
     * テーブルの元となるシート
     */
    private readonly sheet

    /**
     * テーブルが見つからない場合のエラーメッセージ
     */
    private readonly TABLE_NOT_FOUND = 'Table not found'

    /**
     * レコードが見つからない場合のエラーメッセージ
     */
    private readonly RECORD_NOT_FOUND = 'Record not found'

    /**
     * レコードの数
     */
    get length() {
        // 何も入力されていないときは 0
        return this.sheet.getLastColumn()
    }

    /**
     * @param name - テーブル名
     * @throws テーブルが見つからない
     */
    constructor(name: string) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name)
        if (!sheet) throw new Error(this.TABLE_NOT_FOUND)

        // 1 行目しか使わない
        // 見た目は悪いけど処理速度は上がる
        const numRows = sheet.getMaxRows()
        if (numRows !== 1) {
            sheet.deleteRows(2, numRows - 1)
        }

        // シートを保護
        // GUI 上の操作に警告を出す
        const protect = sheet.protect()
        if (!protect.isWarningOnly()) {
            protect.setWarningOnly(true)
        }

        this.name = name
        this.sheet = sheet
    }

    /**
     * レコードを追加
     * @param records - 追加するレコード
     */
    public create(records: unknown[]) {
        setValuesToSheetRange(this.sheet, [records], 1, this.length + 1)
    }

    /**
     * レコードを取得
     * @returns 全てのレコード
     */
    public read() {
        if (!this.length) return []
        return this.sheet.getRange(1, 1, 1, this.length).getValues()[0]
    }

    /**
     * レコードを更新
     * @param record - 更新するレコード
     * @param index - 更新するインデックス
     * @throws レコードが見つからない
     */
    public update(record: unknown, index: number) {
        if (this.length < index) throw new Error(this.RECORD_NOT_FOUND)
        this.sheet.getRange(1, index + 1).setValue(record)
    }

    /**
     * レコードを削除
     * @param index - 削除するインデックス
     * @throws レコードが見つからない
     */
    public delete(index: number) {
        if (this.length < index) throw new Error(this.RECORD_NOT_FOUND)
        this.sheet.deleteColumn(index + 1)
    }
}
