const aiService = require('../services/aiService')

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

module.exports = { getModels }