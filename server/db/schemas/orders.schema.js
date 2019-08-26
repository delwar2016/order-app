"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const orderSchema = new Schema({
  order_no:{
    type: Number,
    default: 1
  },
  user: {
    type: ObjectId,
    required: true,
    ref: 'user'
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
  },
  created_on: {
    type: Date
  }
});
orderSchema.pre('save', function(next) {
  Order.findOne({},{},{sort: { 'order_no' :-1}}).then(order => {
    if(order){
      order.order_no++;
      this.order_no = order.order_no;
    }
    next();
  });
});
const Order = mongoose.model('Order', orderSchema);
module.exports.Order = Order;
