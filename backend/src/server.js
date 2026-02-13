const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())

app.use('/api/ai', require('./routes/aiRoutes'))

app.listen(process.env.PORT, () => {
  console.log(`Server escuchado en el puerto ${process.env.PORT}`)
})