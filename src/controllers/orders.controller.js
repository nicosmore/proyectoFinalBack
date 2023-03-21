const OrdersApi = require('../api/order.api');
const { successResponse, HTTP_STATUS } = require("../utils/api.utils");

const ordersApi = new OrdersApi();


class OrdersControllers {
    
    createOrder = async (req, res, next) => {
        const { IdUser, IdCart } =  req.params;       
        try{
            const newOrder = await ordersApi.createOrder(IdUser, IdCart);
            const response = successResponse(newOrder);
            res.status(HTTP_STATUS.CREATED).json(response);            
          }
          catch(error){
            next(error);
          }
    };

    deleteOrder = async (req, res, next) => {
        const { Id } =  req.params;
        try{
        const delOrder = await ordersApi.delete(Id);
        const response = successResponse(delOrder);
        res.status(HTTP_STATUS.CREATED).json(response);
        }
        catch(error){
        next(error);
        }  
    };

    listOrder = async (req, res, next) => {
        const { Id } =  req.params;
        try{
            const order = await ordersApi.listOrder(Id);
            const response = successResponse(order);
            res.status(HTTP_STATUS.CREATED).json(response);
        }
        catch(error){
            next(error);
        }
    };

    listUserOrders = async (req, res, next) => {
        const { IdUser } =  req.params;
        try{
            const orders = await ordersApi.listUserOrders(IdUser);
            const response = successResponse(orders);
            res.status(HTTP_STATUS.CREATED).json(response);
        }
        catch(error){
            next(error);
        }
    }
    
}

module.exports = OrdersControllers;
