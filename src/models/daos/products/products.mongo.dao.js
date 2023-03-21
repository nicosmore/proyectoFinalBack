const MongoContainer = require("../../container/mongo.container");
const productsSchema = require("../../schemas/mongo.schemas/products.schema");
const { HttpError, HTTP_STATUS } = require("../../../utils/api.utils");

const collection = "products";

class ProductsMongoDao extends MongoContainer {
  constructor() {
    super(collection, productsSchema);
  }

  async getByCategory(prodCategory) {
    const document = await this.model.find({ category: prodCategory}, { __v: 0 });
    try {
      if (!document) {
        const errorMessage = `Resource with category ${category} does not exist in our records`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, errorMessage);
      } else {
        return document;
      }
    } catch (error) {
      throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
    }
  }
}

module.exports = ProductsMongoDao;
