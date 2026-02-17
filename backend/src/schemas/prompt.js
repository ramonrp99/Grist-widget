const z = require('zod')

const messageSchema = z.object({
    role: z.enum(['system', 'user', 'assistant']),
    content: z.string().nonempty()
})

const promptSchema = z.object({
    model: z.string().nonempty(),
    prompt: z.string().nonempty(),
    context: z.string().nonempty(),
    messages: z.array(messageSchema)
})

const validatePrompt = (input) => {
    return promptSchema.safeParse(input)
}

module.exports = { validatePrompt }