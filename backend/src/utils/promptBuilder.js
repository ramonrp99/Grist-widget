const { systemPrompt } = require('../config/systemPrompt')

const buildChatMessages = (prompt, context, history) => {
    return [
        {
            role: 'system',
            content: `${systemPrompt}\n\n${context}`
        },
        ...history,
        {
            role: 'user',
            content: prompt
        }
    ]
}

module.exports = { buildChatMessages }