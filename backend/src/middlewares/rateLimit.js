const { rateLimit } = require('express-rate-limit')
const config = require('../config/env')

const aiLimiter = rateLimit({
    windowMs: config.rateLimit.ai.windowMs,
    limit: config.rateLimit.ai.max,
    message: 'Se ha alcanzado límite de peticiones.'
})

module.exports = { aiLimiter }