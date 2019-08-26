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
module.exports.verifyPayment = order => {
  return Order.findOne({_id: order._id}).then(order => {
    if (!order) {
      throw new Error('This is not a valid order');
    }
    if (order.status === 'canceled') {
      throw new Error('Order is already canceled');
    }
    if (Math.random() >= 0.5) {
      order.status = 'confirmed';
      return order.save();
    } else {
      order.status = 'canceled';
      return order.save()
    }
  });
};