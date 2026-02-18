const express = require('express')
require('dotenv').config()

const { aiLimiter } = require('./middlewares/rateLimit')

const app = express()

app.use(express.json())

app.use('/api/ai', aiLimiter, require('./routes/aiRoutes'))

app.listen(process.env.PORT, () => {
    console.log(`Server escuchado en el puerto ${process.env.PORT}`)
})