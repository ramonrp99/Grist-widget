const { availableModels } = require('../config/models')

// Obtener listado de modelos externos disponibles (OpenRouter)
const getExternalModels = async () => {
    try {
        const res = await fetch('https://openrouter.ai/api/v1/models', {
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
            }
        })
        const json = await res.json()
        
        // La API de OpenRouter siempre devuelve todos sus modelos disponibles
        // Únicamente se devuelven los que se encuentren listados en models.json
        const availableModelsIds = new Set(availableModels.external.map(m => m.id))

        return json.data
            .filter(m => availableModelsIds.has(m.id))
            .map(m => ({
                id: m.id,
                name: availableModels.external.find(am => am.id === m.id)?.name || m.name,
                description: availableModels.external.find(am => am.id === m.id)?.description || '',
                type: 'external'
            }))
    } catch (err) {
        console.error(`Error en llamada a OpenRouter: ${err}`)
        return [];
    }
}

// Obtener listado de modelos locales disponibles
const getLocalModels = async () => {

}

// Obtener listado de modelos disponibles
const getAvailableModels = async () => {
    return await getExternalModels()
}

module.exports = { getAvailableModels }