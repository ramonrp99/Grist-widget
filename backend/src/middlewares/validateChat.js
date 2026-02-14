const { validatePrompt } = require('../schemas/prompt')
const z = require('zod')

const validateChat = (req, res, next) => {
    const result = validatePrompt(req.body)

    if(!result.success) {
        return res.status(400).json({
            ok: false,
            error: 'Petición inválida',
            details: z.treeifyError(result.error)
        })
    }

    next()
}

module.exports = { validateChat }