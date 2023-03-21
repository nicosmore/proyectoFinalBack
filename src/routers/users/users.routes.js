const { Router } = require('express');
const UsersControllers = require('../../controllers/users.controller');

const router = Router();

const userController = new UsersControllers();

router.get('/:Id', userController.getById);
router.put('/:Id', userController.updateUser);

module.exports = router;