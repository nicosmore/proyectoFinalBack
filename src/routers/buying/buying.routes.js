const { Router } = require('express');
const buying = require('../../middlewares/buying');

const router = Router();

router.post('/:userId/:cartId', buying.finishBuying);

module.exports = router;