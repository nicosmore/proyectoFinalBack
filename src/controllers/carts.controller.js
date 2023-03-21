const CartsApi = require("../api/cart.api");
const { successResponse, HTTP_STATUS } = require("../utils/api.utils");

const cartsApi = new CartsApi();

class CartsControllers {

  createCart = async (req, res, next) => {
    try{
      const newCart = await cartsApi.createCart(); 
      const response = successResponse(newCart);
      res.status(HTTP_STATUS.CREATED).json(response);
    }
    catch(error){
      next(error);
    }   
  };  

  deleteCart = async (req, res, next) => {
    const { Id } =  req.params;
    try{
      const delCart = await cartsApi.delete(Id);
      const response = successResponse(delCart);
      res.status(HTTP_STATUS.CREATED).json(response);
    }
    catch(error){
      next(error);
    }  
  };

  listCartProds = async (req, res,next) => { 
  const { Id } =  req.params;
    try {
      const products = await cartsApi.listCartProds(Id)
      const response = successResponse(products)
      res.status(HTTP_STATUS.OK).json(response)
    }
    catch(error){
      next(error);
    }     
  };

  addProds = async (req, res, next) => {
    const { IdCar, IdProd } =  req.params;
    try {
      const products = await cartsApi.addProds(IdCar, IdProd)
      const response = successResponse(products)
      res.status(HTTP_STATUS.OK).json(response)
    }
    catch(error){
    next(error);
    }     
  }

  deleteProductCart = async (req , res, next) => {    
    const { IdCar, IdProd } =  req.params;    
    try {
      const products = await cartsApi.deleteProductCart(IdCar, IdProd)
      const response = successResponse(products)
      res.status(HTTP_STATUS.OK).json(response)
    }
    catch(error){
    next(error);
    }     
 }

 subsProductQty = async (req , res, next) => {  
  const { IdCar, IdProd } =  req.params;    
  try {
    const products = await cartsApi.subsProductQty(IdCar, IdProd)
    const response = successResponse(products)
    res.status(HTTP_STATUS.OK).json(response)
  }
  catch(error){
  next(error);
  } 
}
 
}

module.exports = CartsControllers;