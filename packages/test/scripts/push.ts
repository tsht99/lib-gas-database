import { execSync } from 'child_process'
import { config } from 'dotenv'
import * as fs from 'fs'

config()

fs.copyFileSync('./appsscript.json', './dist/appsscript.json')

// Google Apps Script で環境変数が使えるようにする
const adminApiKey = process.env.ADMIN_API_KEY
const userApiKeys = process.env.USER_API_KEYS
const text = `
const process = {
    env: {
        ADMIN_API_KEY: "${adminApiKey}",
        USER_API_KEYS: \`${userApiKeys}\`
    }
}`
fs.writeFileSync('./dist/.env.js', text)

const buffer = execSync('clasp push')
console.log(buffer.toString())
