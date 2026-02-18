const { rateLimit } = require('express-rate-limit')

const aiLimiter = rateLimit({
    windowMs: (Number.parseInt(process.env.AI_LIMIT_WINDOW_MINS) || 60) * 1000,
    limit: Number.parseInt(process.env.AI_LIMIT_MAX) || 50,
    message: 'Se ha alcanzado límite de peticiones por hora.'
})

module.exports = { aiLimiter }