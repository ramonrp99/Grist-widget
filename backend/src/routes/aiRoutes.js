const { Router } = require('express')
const { getModels } = require('../controllers/aiController')

const router = Router()

router.get('/models', getModels)

module.exports = router