const validateTurnstile = async (req, res, next) => {
    const token = req.headers['cf-turnstile-token']

    if (!token) {
        return res.status(400).json({
            ok: false,
            error: 'Token de seguridad requerido.'
        })
    }

    try {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                secret: process.env.CF_TURNSTILE_SECRET_KEY,
                response: token,
                remoteip: req.ip
            })
        })

        const result = await response.json()

        if (!result.success) {
            return res.status(400).json({
                ok: false,
                error: 'Token de seguridad inválido o expirado'
            })
        }

        next()
    } catch (err) {
        console.error(`Error en llamada a /siteverify de CloudFlare Turnstile: ${err}`)

        return {
            ok: false,
            error: err
        }
    }

}

module.exports = { validateTurnstile }