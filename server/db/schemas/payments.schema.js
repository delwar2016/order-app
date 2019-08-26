"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const paymentSchema = new Schema({
  order: {
    type: ObjectId,
    required: true,
    ref: 'orders'
  },
  card_holder_name: {
    type: String
  },
  card_number: {
    type: String
  },
  amount: {
    type: Number,
    default: 0
  }
});
module.exports.Payment = mongoose.model('Payment', paymentSchema);
