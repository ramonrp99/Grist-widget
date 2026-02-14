const z = require('zod')

const messageSchema = z.object({
    role: z.enum(['system', 'user', 'assistant']),
    message: z.string().nonempty()
})

const promptSchema = z.object({
    model: z.string().nonempty(),
    prompt: z.string().nonempty(),
    context: z.array(z.string()).nonempty().optional(),
    messages: z.array(messageSchema).nonempty().optional()
})

const validatePrompt = (input) => {
    return promptSchema.safeParse(input)
}

module.exports = { validatePrompt }