const fs = require('node:fs')
const path = require('node:path')

const modelsPath = path.join(__dirname, '../../config/systemPrompt.md')

let systemPrompt = ""

try {
    systemPrompt = fs.readFileSync(modelsPath, 'utf-8')
} catch (err) {
    console.error(`Error leyendo el fichero systemPrompt.md: ${err}`)
}

module.exports = { systemPrompt }