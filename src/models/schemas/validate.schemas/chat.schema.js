const yup =  require('yup');

class ChatSchema {
  static #schema = yup.object({
    email: yup.string().email(),       
  })

  constructor(chat) {
    Object.assign(this, chat);
  }

  static async validate(chatValidate){
    return await ChatSchema.#schema.validate(chatValidate);
  }
}

module.exports = ChatSchema;