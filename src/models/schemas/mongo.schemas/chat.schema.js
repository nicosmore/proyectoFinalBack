const { Schema } = require('mongoose');

const cartSchema = new Schema({
    email: {type: String,
        required: true,
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"]
    },
    message:{ type: Array, default: [] },
    type: {type: String},
    createdAt: {type: Date, required: true },
    updatedAt: {type: Date, required: true },  
  });

module.exports = cartSchema;