const fs = require('node:fs')
const path = require('node:path')

const modelsPath = path.join(__dirname, '../../config/models.json')

let availableModels = { external: [] }

try {
    const data = fs.readFileSync(modelsPath, 'utf-8')

    availableModels = JSON.parse(data)
} catch (err) {
    console.error(`Error leyendo el fichero models.json: ${err}`)
}

module.exports = { availableModels }