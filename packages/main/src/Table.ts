import { setValuesToSheetRange } from '@tsht99/lib-gas-utils'
import { ERROR_MESSAGES } from './constants'

/**
 * スプレッドシート内の特定のテーブルを表現するクラスです。
 * @throws 指定した名前のシートが見つからない場合にエラーをスローします。
 */
export class Table {
    /**
     * テーブルの名前
     */
    public readonly name

    /**
     * 対象のシート
     */
    private readonly sheet

    private readonly TABLE_NOT_FOUND = ERROR_MESSAGES.TABLE_NOT_FOUND

    private readonly RECORD_NOT_FOUND = ERROR_MESSAGES.RECORD_NOT_FOUND

    /**
     * レコードの数
     */
    get length() {
        // 何も入力されていないときは 0
        return this.sheet.getLastColumn()
    }

    /**
     * Table クラスの新しいインスタンスを生成します。
     * @param name 作成するテーブルの名前
     * @throws 指定した名前のシートが見つからない場合にエラーをスローします。
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
     * 新しいレコードをテーブルに追加します。
     * @param 追加するレコード
     * @throws レコードが不正な場合にエラーをスローします。
     */
    public create(records: unknown[]) {
        setValuesToSheetRange(this.sheet, [records], 1, this.length + 1)
    }

    /**
     * テーブルの全レコードを取得します。
     * @returns テーブルの全レコード。テーブルが空の場合は空の配列を返します。
     */
    public read() {
        if (!this.length) return []
        return this.sheet.getRange(1, 1, 1, this.length).getValues()[0]
    }

    /**
     * 指定したインデックスのレコードを更新します。
     * @param record 更新するレコード
     * @param index 更新するレコードのインデックス
     * @throws 指定したインデックスが範囲外の場合にエラーをスローします。
     */
    public update(record: unknown, index: number) {
        if (index < 0 || this.length <= index) throw new Error(this.RECORD_NOT_FOUND)
        this.sheet.getRange(1, index + 1).setValue(record)
    }

    /**
     * 指定したインデックスのレコードを削除します。
     * @param 削除するレコードのインデックス
     * @throws 指定したインデックスが範囲外の場合にエラーをスローします。
     */
    public delete(index: number) {
        if (index < 0 || this.length <= index) throw new Error(this.RECORD_NOT_FOUND)
        if (this.length === 1) this.sheet.getRange(1, 1).clear()
        else this.sheet.deleteColumn(index + 1)
    }
}
