import { setValuesToSheetRange } from '@tsht99/lib-gas-utils'

/**
 * スプレッドシートをデータベースとして操作するためのクラス。
 */
export class SheetDatabase {
    /**
     * データベースの名前。
     */
    public readonly name

    /**
     * データベースと関連付けられたスプレッドシートのシート。
     */
    private readonly sheet

    /**
     * スプレッドシートが見つからない場合のエラーメッセージ。
     */
    private readonly SHEET_NOT_FOUND = 'sheet not found'

    /**
     * レコードが見つからない場合のエラーメッセージ。
     */
    private readonly RECORD_NOT_FOUND = 'record not found'

    /**
     * データベース内のレコードの数。
     */
    get length() {
        // 何も入力されていないときは 0
        return this.sheet.getLastColumn()
    }

    /**
     * Database クラスの新しいインスタンスを作成します。
     * @param sheetName - 関連付けるスプレッドシートのシート名。
     * @throws スプレッドシートが見つからない場合にスローされるエラー。
     */
    constructor(sheetName: string) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
        if (!sheet) throw new Error(this.SHEET_NOT_FOUND)

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

        this.name = sheetName
        this.sheet = sheet
    }

    /**
     * 新しいレコードをデータベースに追加します。
     * @param records - 追加するレコードの配列。
     */
    public create(records: unknown[]) {
        setValuesToSheetRange(this.sheet, [records], 1, this.length + 1)
    }

    /**
     * データベースの全てのデータを読み取ります。
     * @returns 全てのデータ。
     */
    public read() {
        if (!this.length) return []
        return this.sheet.getRange(1, 1, 1, this.length).getValues()[0]
    }

    /**
     * 指定されたインデックス位置に新しいデータを設定します。
     * @param record - 設定する新しいデータ。
     * @param index - データを設定するインデックス。
     * @throws 指定されたインデックス位置が存在しない場合にスローされるエラー。
     */
    public update(record: unknown, index: number) {
        if (this.length < index) throw new Error(this.RECORD_NOT_FOUND)
        this.sheet.getRange(1, index + 1).setValue(record)
    }

    /**
     * 指定されたインデックス位置を削除します。
     * @param index - 削除するインデックス。
     * @throws 指定されたインデックス位置が存在しない場合にスローされるエラー。
     */
    public delete(index: number) {
        if (this.length < index) throw new Error(this.RECORD_NOT_FOUND)
        this.sheet.deleteColumn(index + 1)
    }
}
