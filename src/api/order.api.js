const { HttpError, HTTP_STATUS } = require("../utils/api.utils");
const { OrdersDao } = require('../models/daos/daos.factory');
const OrderDTO = require('../models/dtos/order.dto');

const ordersDao = new OrdersDao();

class OrdersApi {
    constructor(){
    
    }

    async createOrder(userId, cartId){
        const order = {user: userId, cart: cartId};
        const orderDTO = await new OrderDTO(order);
        console.log(orderDTO);           
        return ordersDao.save(orderDTO);
    }

    async deleteOrder(id){
        if (!id){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await ordersDao.delete(id);
    }

    async listOrder(id){
        if (!id){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await ordersDao.getById(id);
    }

    async listUserOrders(userId){
        if (!userId){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await ordersDao.listUserOrders(userId);
    }

}

module.exports = OrdersApi;