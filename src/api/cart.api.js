const { HttpError, HTTP_STATUS } = require("../utils/api.utils");
const { CartsDao } = require('../models/daos/daos.factory');
const CartDTO = require('../models/dtos/carts.dto');

const cartsDao = new CartsDao();

class CartsApi {
    constructor(){

    }

    async createCart(userID) {  
        const cart = {};
        const cartDTO = new CartDTO(cart);
        cartDTO.user = userID;        
        return cartsDao.save(cartDTO);
    }

    async deleteCart(id) {
        if (!id){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await cartsDao.delete(id);
    }

    async listCartProds(id) {
        if (!id){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await cartsDao.listCartProds(id);
    }

    async addProds(IdCar, IdProd) {
        if (!IdCar || !IdProd) {
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await cartsDao.addProductToCart(IdCar, IdProd);
    }

    async deleteProductCart(IdCar, IdProd) {
        console.log("api");
        if (!IdCar || !IdProd) {
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await cartsDao.deleteProductCart(IdCar, IdProd);
    }

    async subsProductQty(IdCar, IdProd) {        
        if (!IdCar || !IdProd) {
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await cartsDao.subsProductQty(IdCar, IdProd);
    }

    async updateCart (id, productPayload) {
        if (!id){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }        
        return await cartsDao.update(id, productPayload);
    }

}

module.exports = CartsApi;