"use strict";

const { Order } = require('../schemas/orders.schema');
const { Payment } = require('../schemas/payments.schema');
const { User } = require('../schemas/users.schema');
const Promise = require('bluebird');
const _ = require('underscore');

/**
 * save Payment
 * @param paymentData
 */
module.exports.saveNewPayment = paymentData => {
  return User.findOne({username: orderData.username}).then(user => {
    if (!user) {
      throw new Error('The user is not registered');
    }
    const order = new Order(orderData);
    order.user = user._id;
    order.delivery_address = orderData.delivery_address;
    order.phone_number = orderData.phone_number;
    order.item_detail = orderData.item_detail;
    order.price = orderData.price;
    order.status = orderData.status;
    return order.save();
  });
};