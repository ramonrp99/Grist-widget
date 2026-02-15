const { Router } = require('express')
const aiController = require('../controllers/aiController')
const { validateChatRequest } = require('../middlewares/validateRequests')

const router = Router()

router.get('/models', aiController.getModels)
router.post('/chat', validateChatRequest, aiController.generateCompletion)

module.exports = router