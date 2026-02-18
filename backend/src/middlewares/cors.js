const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin)) {
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