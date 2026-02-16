const aiService = require('../services/aiService')
const { buildChatMessages } = require('../utils/promptBuilder')

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
        const answer = await aiService.generateCompletion(model, totalMessages.data)

        res.json({
            ok: true,
            data: answer
        })
    } catch (err) {
        res.status(400).json({
            ok: false,
            error: err.message
        })
    }
}

module.exports = { getModels, generateCompletion }