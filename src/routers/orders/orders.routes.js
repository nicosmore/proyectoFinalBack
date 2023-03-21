const express = require('express');
const OrdersController = require('../../controllers/orders.controller');


const orderCont = new OrdersController();
const router = express.Router();

router.post('/:IdUser/:IdCart', orderCont.createOrder)
router.delete('/:Id', orderCont.deleteOrder);
router.get('/:Id', orderCont.listOrder);
router.get('/list/:IdUser', orderCont.listUserOrders)

module.exports = router; 