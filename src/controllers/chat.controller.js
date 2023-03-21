const ChatApi = require("../api/chat.api");
const { successResponse, HTTP_STATUS } = require("../utils/api.utils");


const chatApi = new ChatApi();

class ChatControllers {
  constructor() {}

  addMessage = async (req, res, next) => {
    const {email, msj} = req.body;    
    try {
      const newMessage = await chatApi.addMessage(email, msj);
      const response = successResponse(newMessage);
      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  };

  getMessageByEmail = async (req, res, next) => {
    const { Email } = req.params;
    try {
      const message = await chatApi.getMessageByEmail(Email);
      const response = successResponse(message);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}
module.exports = ChatControllers;


