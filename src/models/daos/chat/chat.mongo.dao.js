const MongoContainer = require('../../container/mongo.container');
const chatSchema = require('../../schemas/mongo.schemas/chat.schema');
const { HttpError, HTTP_STATUS } = require("../../../utils/api.utils");
const moment = require("moment/moment");

const collection = 'messages';

class ChatMongoDao extends MongoContainer {
    constructor() {
        super(collection, chatSchema);
    }

    async addMessage(email, msj){
      const data = moment().format('"DD/MM/YYYY - HH:mm"')
      const addMessage = await this.model.updateOne(
        {email: email},
        {$push:{message: {date:data, msj:msj}}},
      )
      if (!addMessage.matchedCount) {
        const message = `Resource with email ${email} does not exist in our records`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
      }      
      return addMessage;

    }

    async getMessageByEmail(email) {
      try {
        const document = await this.model.findOne({ email }, { __v: 0 });
          if (!document) {
            const errorMessage = `Wrong email`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, errorMessage);
          } else {
            return document.message;
          }
      }
      catch(error) {
        throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
      }
    }

    async lastMessageByEmail(email) {
      const document = await this.getMessageByEmail(email);
      const lastMessage = document[document.length-1]
      try {
        if (!document) {
          const errorMessage = `Wrong email`;
          throw new HttpError(HTTP_STATUS.NOT_FOUND, errorMessage);
        } else {
          return lastMessage;
        }
        
      } catch (error) {
         throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
      }
    }

    
}

    

module.exports = ChatMongoDao;