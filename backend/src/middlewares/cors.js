const config = require('../config/env')

const corsOptions = {
    origin: function (origin, callback) {
        if (config.allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Acceso no permitido por CORS'))
        }
    },
    allowedHeaders: [
        'Content-Type',
        'CF-TURNSTILE-TOKEN'
    ]
}

module.exports = { corsOptions }