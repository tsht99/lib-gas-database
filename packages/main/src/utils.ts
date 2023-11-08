/**
 * 値がオブジェクトであるかを判定します。
 * @param value 判定対象の値
 * @returns 値がオブジェクトであればtrue、そうでなければfalse
 */
export const isObject = (value: unknown): value is Record<string, unknown> => {
    if (typeof value === 'object' && value !== null) return true
    return false
}
