const { Schema } = require('mongoose');

const cartSchema = new Schema({
    createdAt: {type: Date, required: true },
    updatedAt: {type: Date, required: true },   
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
    products: { type: Array, default: [] },
    shipping_address: { type: String}
  });

module.exports = cartSchema;