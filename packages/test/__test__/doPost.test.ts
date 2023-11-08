import axios from 'axios'
import { ERROR_MESSAGES, Payload, Table } from '@tsht99/lib-gas-database'
import { config } from 'dotenv'

config()

const url = `https://script.google.com/macros/s/${process.env.DEPLOY_ID}/exec`
const timeout = 60 * 1000

describe('前処理', () => {
    test(
        'レコードを全て削除',
        async () => {
            const payload = {
                apiKey: 'V|xP+K~|qaA9',
                type: 'delete',
                index: 0,
            }
            while (true) {
                const res = await axios.post(url, payload)
                const data = res.data as Payload
                if (data.isError) break
            }
        },
        timeout
    )
})

describe('異常系', () => {
    test(
        'ペイロードがない場合はエラー',
        () => {
            return axios.post(url).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(true)
                expect(data.message).toBe(ERROR_MESSAGES.MISSING_PAYLOAD)
            })
        },
        timeout
    )

    test(
        'ペイロードがパースできないときはエラー',
        () => {
            const payload = 'hoge'
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(true)
                expect(data.message).toBe(ERROR_MESSAGES.INVALID_JSON)
            })
        },
        timeout
    )

    test(
        'ペイロードがオブジェクトでないときはエラー',
        () => {
            const payload = '"hoge"'
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(true)
                expect(data.message).toBe(ERROR_MESSAGES.INVALID_PAYLOAD)
            })
        },
        timeout
    )

    test(
        'ペイロードが配列ときはエラー',
        () => {
            const payload = ['hoge']
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(true)
                expect(data.message).toBe(ERROR_MESSAGES.INVALID_PAYLOAD)
            })
        },
        timeout
    )

    test(
        'API キーを渡さないときはエラー',
        () => {
            const payload = {}
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(true)
                expect(data.message).toBe(ERROR_MESSAGES.MISSING_API_KEY)
            })
        },
        timeout
    )

    test(
        'API キーが文字列以外のときはエラー',
        () => {
            const payload = { apiKey: 123 }
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(true)
                expect(data.message).toBe(ERROR_MESSAGES.INVALID_API_KEY)
            })
        },
        timeout
    )

    test(
        'API キーが登録されていないときはエラー',
        () => {
            const payload = { apiKey: '123' }
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(true)
                expect(data.message).toBe(ERROR_MESSAGES.UNREGISTERED_API_KEY)
            })
        },
        timeout
    )

    test(
        'Creat: レコードが配列でないときはエラー',
        () => {
            const payload = {
                apiKey: 'V|xP+K~|qaA9',
                type: 'create',
                records: 'create1st',
            }
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(true)
                expect(data.message).toBe('レコードの配列を指定してください')
            })
        },
        timeout
    )

    test(
        'Update: インデックスを指定しないときはエラー',
        () => {
            const payload = {
                apiKey: 'V|xP+K~|qaA9',
                type: 'update',
                record: 'update1st',
            }
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(true)
                expect(data.message).toBe('インデックスを指定してください')
            })
        },
        timeout
    )

    test(
        'Update: 存在しないインデックスのときはエラー',
        () => {
            const payload = {
                apiKey: 'V|xP+K~|qaA9',
                type: 'update',
                record: 'update1st',
                index: -1,
            }
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(true)
                expect(data.message).toBe(ERROR_MESSAGES.RECORD_NOT_FOUND)
            })
        },
        timeout
    )

    test(
        'Update: 存在しないインデックスのときはエラー',
        () => {
            const payload = {
                apiKey: 'V|xP+K~|qaA9',
                type: 'update',
                record: 'update1st',
                index: 0,
            }
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(true)
                expect(data.message).toBe(ERROR_MESSAGES.RECORD_NOT_FOUND)
            })
        },
        timeout
    )

    test(
        'Delete: インデックスを指定しないときはエラー',
        () => {
            const payload = {
                apiKey: 'V|xP+K~|qaA9',
                type: 'delete',
            }
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(true)
                expect(data.message).toBe('インデックスを指定してください')
            })
        },
        timeout
    )

    test(
        'Delete: 存在しないインデックスのときはエラー',
        () => {
            const payload = {
                apiKey: 'V|xP+K~|qaA9',
                type: 'delete',
                index: -1,
            }
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(true)
                expect(data.message).toBe(ERROR_MESSAGES.RECORD_NOT_FOUND)
            })
        },
        timeout
    )

    test(
        'Delete: 存在しないインデックスのときはエラー',
        () => {
            const payload = {
                apiKey: 'V|xP+K~|qaA9',
                type: 'delete',
                index: 0,
            }
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(true)
                expect(data.message).toBe(ERROR_MESSAGES.RECORD_NOT_FOUND)
            })
        },
        timeout
    )

    test(
        'type が指定されないときはエラー',
        () => {
            const payload = {
                apiKey: 'V|xP+K~|qaA9',
            }
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(true)
                expect(data.message).toBe(ERROR_MESSAGES.INVALID_TYPE_PROPERTY)
            })
        },
        timeout
    )
})

describe('正常系', () => {
    test(
        'Creat: レコードを追加できる',
        () => {
            const payload = {
                apiKey: 'V|xP+K~|qaA9',
                type: 'create',
                records: ['create1st', 'create2nd', 'create3rd'],
            }
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(false)
            })
        },
        timeout
    )

    test(
        'Update: レコードを変更できる',
        () => {
            const payload = {
                apiKey: 'V|xP+K~|qaA9',
                type: 'update',
                record: 'update1st',
                index: 1,
            }
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(false)
            })
        },
        timeout
    )

    test(
        'Delete: レコードを削除できる',
        () => {
            const payload = {
                apiKey: 'V|xP+K~|qaA9',
                type: 'delete',
                index: 0,
            }
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(false)
            })
        },
        timeout
    )

    test(
        'Read: 操作がテーブルに反映されている',
        () => {
            const payload = {
                apiKey: 'V|xP+K~|qaA9',
                type: 'read',
            }
            return axios.post(url, payload).then((res) => {
                const data = res.data as Payload
                expect(data.isError).toBe(false)
                expect(data.records).toEqual(['update1st', 'create3rd'])
            })
        },
        timeout
    )
})
