const OrdersApi = require('../api/order.api');
const {CartsDao, UsersDao} = require('../models/daos/daos.factory');
const CartApi = require('../api/cart.api');
const sendMail = require('./ethereal');

const ordersApi = new OrdersApi();
const cartApi = new CartApi();
const cartDao = new CartsDao();
const userDao = new UsersDao();

const finishBuying = async (req, res, next) => { 
    
    const {params: {userId, cartId}, body: {shipping_address}} = req;

    const newOrder = await ordersApi.createOrder(userId, cartId);

    const cart = await cartDao.getById(cartId);
    const updateCart = {...cart, shipping_address}
    await cartDao.update(cartId, updateCart);

    const newCart = await cartApi.createCart(userId);
    const user = await userDao.getById(userId);
    const updateUser = {...user, cart: newCart._id};
    await userDao.update(userId, updateUser);

    sendMail.orderMail(user.email ,newOrder._id);
    
    return res.redirect('../../success');
};



module.exports = {finishBuying};