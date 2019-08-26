"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const orderSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'users'
  },
  delivery_address: {
    type: String
  },
  phone_number: {
    type: String
  },
  item_detail: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['created', 'confirmed', 'delivered', 'canceled'],
    default: 'created'
  }
});
module.exports.Order = mongoose.model('Order', orderSchema);
