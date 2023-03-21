const envConfig = require('../../config/env.config'); 

let ProductsDao;
let CartsDao;
let UsersDao;
let OrdersDao;
let ChatDao;

console.log(envConfig.DATASOURCE);
switch(envConfig.DATASOURCE) {  
  case 'mongo':
    ProductsDao = require('./products/products.mongo.dao');
    CartsDao = require('./carts/carts.mongo.dao'); 
    UsersDao = require('./users/users.mongo.dao');
    OrdersDao = require('./orders/orders.mongo.dao');
    ChatDao = require('./chat/chat.mongo.dao');
    
    break;

  default:    
    throw new Error("Invalid Datasource");
  }
  
  module.exports = { 
    ProductsDao, 
    CartsDao, 
    UsersDao, 
    OrdersDao,
    ChatDao
  };

  