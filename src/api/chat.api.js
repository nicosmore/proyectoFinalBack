const ChatSchema = require('../models/schemas/validate.schemas/products.schema');
const { HttpError, HTTP_STATUS } = require("../utils/api.utils");
const { ChatDao } = require('../models/daos/daos.factory');
const ChatDTO = require('../models/dtos/chat.dto');

const chatDao = new ChatDao();

class ChatApi {    
    constructor(){}

    async createMessage (email) {
        //await ChatSchema.validate(email);
        const chat = {email};
        const chatDTO = new ChatDTO(chat)
        if (!email){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }        
        return await chatDao.save(chatDTO);
    }

    async addMessage(email, msj){
        if (!email || !msj) {
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await chatDao.addMessage(email, msj);
    }

    async getMessageByEmail(email) {
        if (!email){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await chatDao.getMessageByEmail(email);
    }

    async lastMessageByEmail(email) {
        if (!email){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await chatDao.lastMessageByEmail(email);
    }
}
module.exports = ChatApi;