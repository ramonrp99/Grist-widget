const config = require('../config/env')

// Obtener listado de modelos disponibles en OpenRouter
const getOpenRouterModels = async () => {
    try {
        const res = await fetch('https://openrouter.ai/api/v1/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${config.openRouterApiKey}`
            }
        })
        const json = await res.json()

        if(json.error) {
            return {
                ok: false,
                error: json.error
            }
        }

        return {
            ok: true,
            data: json.data
        }
    } catch (err) {
        console.error(`Error en llamada a /models en OpenRouter: ${err}`)

        return {
            ok: false,
            error: err
        }
    }
}

// Obtener listado de modelos locales disponibles
const getLocalModels = async () => {

}

// Obtener listado de modelos disponibles
const getAvailableModels = async () => {
    return await getOpenRouterModels()
}

// Enviar prompt a modelo de OpenRouter
const generateOpenRouterCompletion = async (model, messages) => {
    try {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${config.openRouterApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'model': model,
                'messages': messages
            })
        })
        const json = await res.json()

        if(json.error) {
            return {
                ok: false,
                error: json.error
            }
        }

        return {
            ok: true,
            data: json.choices[0].message.content
        }
    } catch (err) {
        console.error(`Error en llamada a OpenRouter: ${err}`)
        return {
            ok: false,
            error: err
        }
    }
}

// Enviar prompt a modelo local
const generateLocalCompletion = async (data) => {

}

// Enviar prompt al modelo seleccionado
const generateCompletion = async (model, messages) => {
    return await generateOpenRouterCompletion(model, messages)
}

module.exports = { getAvailableModels, generateCompletion }