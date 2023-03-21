const MongoContainer = require('../../container/mongo.container');
const { HttpError, HTTP_STATUS } = require("../../../utils/api.utils");
const ProductsMongoDAO = require('../products/products.mongo.dao')
const cartSchema = require('../../schemas/mongo.schemas/cart.schema');

const productsMongoDAO = new ProductsMongoDAO()

const collection = 'carts';


  class CartMongoDao extends MongoContainer{
    constructor(){
        super(collection, cartSchema);
    }

    async listCartProds (cartId){        
        const cart = await this.getById(cartId);        
        const productos = await this.dataListProdsInCart(cart.products)        
        return [...productos]
    }

    async dataListProdsInCart (cartProduct){
        const cartProds = [];

        for (let i = 0; i < cartProduct.length; i++){            
            const prod =  await productsMongoDAO.getById(cartProduct[i].productId);

            let newProd = { 
                _id: prod._id,               
                name: prod.name,
                description: prod.description,
                image: prod.image,
                price: prod.price,
                qty: cartProduct[i].qty,
                }
            cartProds.push(newProd);                
        }        
        return cartProds;
    }

    async addProductToCart(cartId, productId){
        
        const cart = await this.getById(cartId);        
        const product = await productsMongoDAO.getById(productId);        
        const productsInCart = await this.productsInCart(cart, productId);
        
        let addCartProd;

        if(productsInCart) {           
            const prodIndex = cart.products.findIndex(prod => prod.productId === productId); 
            const newQty = cart.products[prodIndex].qty+1;            
            
            addCartProd = await this.model.updateOne(
                {_id: cartId},
                {$set:{"products.$[elem].qty":newQty}},
                {arrayFilters: [{"elem.productId": productId}]}
            )
        } else {
            console.log("else");
            addCartProd = await this.model.updateOne(
                {_id: cartId},
                {$push:{products: {productId, qty: 1}}},
            )
        }        
        if (!addCartProd.matchedCount) {
            const message = `Resource with id ${cartId} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return product;
    }    

    async productsInCart (cart, productId) {        
        const product = cart.products.find(prod => prod.productId === productId);
        
        if (!product){
            return false;
        }
        return true;
    }

    async deleteProductCart(cartId, productId){             
        await productsMongoDAO.getById(productId);
        const deleteProd = await this.model.updateOne(
            {_id: cartId},
            {$pull:{products: {productId:productId}}}
        )
        if (!deleteProd.matchedCount) {
            const message = `Resource with id ${cartId} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return deleteProd;
    }

    async subsProductQty(cartId, productId){        
        const cart = await this.getById(cartId);
        console.log(cart);
        const prodIndex = cart.products.findIndex(prod => prod.productId === productId); 
        const newQty = cart.products[prodIndex].qty-1;        
                        
        const updateQty = await this.model.updateOne(
            {_id: cartId},
            {$set:{"products.$[elem].qty": newQty}},
            {arrayFilters: [{"elem.productId": productId}]}
        )
        if (!updateQty.matchedCount) {
            const message = `Resource with id ${cartId} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }        
        return updateQty; 
    }
  };

  module.exports = CartMongoDao;