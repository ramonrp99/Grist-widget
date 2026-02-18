const aiService = require('../services/aiService')
const { buildChatMessages } = require('../utils/promptBuilder')
const { extractTable } = require('../utils/markdown')

const { availableModels } = require('../config/models')

const getModels = async(req, res) => {
    try {
        const response = await aiService.getAvailableModels()

        if (!response.ok) {
            return res.json(response)
        }

        // La API de OpenRouter siempre devuelve todos sus modelos disponibles
        // Únicamente se devuelven los que se encuentren listados en models.json
        const availableModelsIds = new Set(availableModels.external.map(m => m.model))
        const models = response.data.filter(m => availableModelsIds.has(m.id))
                                    .map(m => ({
                                        model: m.id,
                                        name: availableModels.external.find(am => am.model === m.id)?.name || m.name,
                                        description: availableModels.external.find(am => am.model === m.id)?.description || '',
                                        type: 'external'
                                    }))

        res.json({
            ok: true,
            data: models
        })
    } catch (err) {
        res.status(400).json({
            ok: false,
            error: err.message
        })
    }
}

const generateCompletion = async(req, res) => {
    const { model, prompt, context, messages } = req.body

    const totalMessages = buildChatMessages(prompt, context, messages)

    if (!totalMessages.ok) {
        return res.status(400).json({
            ok: false,
            error: totalMessages.error
        })
    }

    try {
        const response = await aiService.generateCompletion(model, totalMessages.data)

        if (!response.ok) {
            return res.json(response)
        }

        const estructuredResponse = extractTable(response.data)

        res.json({
            ok: true,
            response: estructuredResponse.text,
            data: estructuredResponse.table
        })
    } catch (err) {
        res.status(400).json({
            ok: false,
            error: err.message
        })
    }
}

module.exports = { getModels, generateCompletion }