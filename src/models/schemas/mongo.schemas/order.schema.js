const { Schema } = require('mongoose');

const orderSchema = new Schema({
    createdAt: {type: Date, required: true },
    updatedAt: {type: Date, required: true },   
    user: { type: Schema.Types.ObjectId, ref: "users", required: true},
    cart: { type: Schema.Types.ObjectId, ref: "carts", required: true},    
  });

module.exports = orderSchema;