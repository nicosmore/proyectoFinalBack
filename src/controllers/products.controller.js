const ProductsApi = require("../api/products.api");
const { successResponse, HTTP_STATUS } = require("../utils/api.utils");

const productsApi = new ProductsApi();

class ProductsController {
  constructor() {}

  getProducts = async (req, res, next) => {
    try {
      const products = await productsApi.getProducts();
      const response = successResponse(products);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  getProductById = async (req, res, next) => {
    const { Id } = req.params;
    try {
      const products = await productsApi.getProductById(Id);
      const response = successResponse(products);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  getProductCategory = async (req, res, next) => {
    const { category } = req.params;
    try {
      const products = await productsApi.getProductCategory(category);
      const response = successResponse(products);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  createProduct = async (req, res, next) => {
    const productPayload = req.body;
    try {
      const newProduct = await productsApi.createProduct(productPayload);
      const response = successResponse(newProduct);
      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req, res, next) => {
    const { Id } = req.params;
    const productPayload = req.body;
    try {
      const updateProduct = await productsApi.updateProduct(Id, productPayload);
      const response = successResponse(updateProduct);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req, res, next) => {
    const { Id } = req.params;
    try {
      const deletedProduct = await productsApi.deleteProduct(Id);
      const response = successResponse(deletedProduct);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}
module.exports = ProductsController;
