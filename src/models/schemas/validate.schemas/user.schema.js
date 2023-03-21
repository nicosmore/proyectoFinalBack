const yup = require('yup');

class UserSchema{
  static #schema = yup.object({
    name: yup.string().required(),
    lastname: yup.string().required(),
    phone: yup.number().required(),    
    email: yup.string().email(),
    password: yup.string().required(),    
  })

  constructor(user) {
    Object.assign(this, user);
  }

  static async validate(userValidate){
    return await UserSchema.#schema.validate(userValidate);
  }
}

module.exports = UserSchema;