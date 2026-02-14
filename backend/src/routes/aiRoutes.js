const { Router } = require('express')
const aiController = require('../controllers/aiController')
const { validateChat } = require('../middlewares/validateChat')

const router = Router()

router.get('/models', aiController.getModels)
router.post('/chat', validateChat, aiController.generateCompletion)

module.exports = router