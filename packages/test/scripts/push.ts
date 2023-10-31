import * as fs from 'fs'
import { execSync } from 'child_process'

const sourcePath = './appsscript.json'
const destPath = './dist/appsscript.json'

fs.copyFile(sourcePath, destPath, (err) => {
    if (err) throw err
    const buffer = execSync('clasp push')
    console.log(buffer.toString())
})
