const MongoContainer = require('../../container/mongo.container');
const { HttpError, HTTP_STATUS } = require("../../../utils/api.utils");
//const cartMongoDAO = require('../products/products.mongo.dao')
const orderSchema = require('../../schemas/mongo.schemas/order.schema');

//const productsMongoDAO = new ProductsMongoDAO()

const collection = 'orders';

class OrderMongoDao extends MongoContainer{
    constructor(){
        super(collection, orderSchema);
    }

    async listUserOrders (idUser){
        const document = await this.model.find({userId: idUser}, { __v: 0 }).lean();
        try {
            if (!document) {
              const errorMessage = `Resource with id ${idUser} does not exist in our records`;
              throw new HttpError(HTTP_STATUS.NOT_FOUND, errorMessage);
            } else {
                return document;
            }
        } catch (error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }        
    }
};

module.exports = OrderMongoDao;