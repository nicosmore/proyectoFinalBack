const { HTTP_STATUS, errorResponse } = require("../utils/api.utils");

const errorMiddleware = (error, req, res, next) => {
  const errorStatus = error.status || HTTP_STATUS.INTERNAL_ERROR;
  const errorItem = {
    message: error.description || error.message,
    details: error.details || null,
  }
  const errorPayload = errorResponse(errorItem, errorStatus)
  return res.status(errorStatus).json(errorPayload);
}

module.exports = errorMiddleware;