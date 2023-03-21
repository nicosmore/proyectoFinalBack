const { Router } = require('express');
const ChatControllers = require('../../controllers/chat.controller');

const router = Router();

const chatController = new ChatControllers();

router.post('/', chatController.addMessage);
router.get('/:Email', chatController.getMessageByEmail);

module.exports = router;