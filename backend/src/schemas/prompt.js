const z = require('zod')
const config = require('../config/env')

const messageSchema = z.object({
    role: z.enum(['system', 'user', 'assistant']),
    content: z.string().nonempty().max(config.schemas.messagesSchema.content.maxLength)
})

const promptSchema = z.object({
    model: z.string().nonempty().max(config.schemas.promptSchema.model.maxLength),
    prompt: z.string().nonempty().max(config.schemas.promptSchema.prompt.maxLength),
    context: z.string().nonempty().max(config.schemas.promptSchema.context.maxLength),
    messages: z.array(messageSchema)
})

const validatePrompt = (input) => {
    return promptSchema.safeParse(input)
}

module.exports = { validatePrompt }