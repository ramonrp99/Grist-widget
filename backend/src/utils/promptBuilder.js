const { countTokens } = require('./tokenizer')
const { splitTableIntoRows } = require('./markdown')

const { systemPrompt } = require('../config/systemPrompt')

// Comprueba que el listado de mensajes (system promp + user prompt + contexto + historial) no superan el límite de tokens establecido
// y devuelve el listado de mensajes listo para enviar a un LLM
// Si se supera el límite:
// - 1º. Reduce el historial de mensajes (descarta primero los más antiguos)
// - 2º. Reduce el contexto (mantiene mínimo las 3 primeras filas (cabecera, separador y fila nº 1))
// Devuelve un error controlado si continua superando el límite tras la reducción máxima
const buildChatMessages = (userPrompt, context, history) => {
    const systemPromptTokens = countTokens(systemPrompt)
    const userPromptTokens = countTokens(userPrompt)
    const contextTokens = countTokens(context)
    const historyTokens = history.map(msg => ({
        ...msg,
        tokens: countTokens(msg.content)
    }))

    const maxTokens = process.env.MAX_TOKENS

    let totalTokens = systemPromptTokens + userPromptTokens + contextTokens + historyTokens.reduce((sum, msg) => sum + msg.tokens, 0)
    let finalHistoryMessages = history
    let finalContext = context

    // Comprueba si el system prompt, user prompt, contexto (tabla markdown de datos) e historial de conversación superan el límite de tokens
    // En caso de superarse, trunca el historial de conversación
    if (totalTokens > maxTokens) {
        totalTokens = systemPromptTokens + userPromptTokens + contextTokens

        // Comprueba si el system prompt, user prompt y el contexto superan el límite
        // En caso de superarse, trunca el contexto manteniendo mínimo las 3 primeras filas de la tabla (cabecera, separador y fila 1)
        if (totalTokens > maxTokens) {
            finalHistoryMessages = []

            // Divide la tabla en filas y las tokeniza
            const contextRowsTokens = splitTableIntoRows(context).map(row => ({
                content: row,
                tokens: countTokens(row)
            }))

            totalTokens = systemPromptTokens + userPromptTokens + contextRowsTokens[0].tokens + contextRowsTokens[1].tokens + contextRowsTokens[2].tokens

            // Devuelve error controlado si la tabla mínima (3 primeras filas) supera el límite
            if (totalTokens > maxTokens) {
                return {
                    ok: false,
                    error: 'El mensaje excede el límite máximo de tokens establecido. Debe reducir el mensaje o el contexto seleccionado.'
                }
            }

            // Incluye filas de la tabla hasta alcanzar el límite
            finalContext = contextRowsTokens[0].content + '\n' + contextRowsTokens[1].content + '\n' + contextRowsTokens[2].content

            for (let i = 3; i < contextRowsTokens.length - 1; i++) {
                if(totalTokens < maxTokens) {
                    finalContext += '\n' + contextRowsTokens[i].content
                    totalTokens += contextRowsTokens[i].tokens
                } else {
                    break
                }
            }
        } else {
            // Incluye mensajes del historial hasta alcanzar el límite (de más reciente a más antiguo)
            finalHistoryMessages = []

            for (let i = history.length - 1; i > 0; i--) {
                if (totalTokens < maxTokens) {
                    finalHistoryMessages.splice(0, 0, history[i])
                    totalTokens += historyTokens[i].tokens
                } else {
                    break
                }
            }
        }
    }

    return {
        ok: true,
        data: [
            {
                role: 'system',
                content: `${systemPrompt}\n\n${finalContext}`
            },
            ...finalHistoryMessages,
            {
                role: 'user',
                content: userPrompt
            }
        ]
    }
}

module.exports = { buildChatMessages }