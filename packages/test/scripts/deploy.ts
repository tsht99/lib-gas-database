import { execSync } from 'child_process'

let buffer = execSync('clasp deployments')
console.log(buffer.toString())
const lastLine = buffer.toString().trim().split('\n').slice(-1)[0]
const [, deploymentId, version] = lastLine.split(' ')
if (version === '@HEAD') throw new Error('未実装')
buffer = execSync(`clasp deploy --deploymentId ${deploymentId}`)
console.log(buffer.toString())
