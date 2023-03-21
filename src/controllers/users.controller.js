const UsersApi = require("../api/users.api");
const { successResponse, HTTP_STATUS } = require("../utils/api.utils");

const usersApi = new UsersApi();

class UsersControllers {
  constructor() {}

  getById = async (req, res, next) => {
    const { Id } = req.params;
    try {
      const user = await productsApi.getUserId(Id);
      const response = successResponse(user);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    const { Id } = req.params;
    const userPayload = req.body;
    try {
      const updateUser = await productsApi.updateUser(Id, userPayload);
      const response = successResponse(updateUser);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  };  

  getUsers = async (req, res, next) => {
    try {
      const users = await usersApi.getUsers();
      const response = successResponse(users);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersControllers;