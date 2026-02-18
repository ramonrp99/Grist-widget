const aiService = require('../services/aiService')
const { buildChatMessages } = require('../utils/promptBuilder')
const { extractTable } = require('../utils/markdown')

const getModels = async(req, res) => {
    try {
        const models = await aiService.getAvailableModels()

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