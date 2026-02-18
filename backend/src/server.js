require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { aiLimiter } = require('./middlewares/rateLimit')
const { corsOptions } = require('./middlewares/cors')

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/ai', aiLimiter, require('./routes/aiRoutes'))

app.listen(process.env.PORT, () => {
    console.log(`Server escuchado en el puerto ${process.env.PORT}`)
})