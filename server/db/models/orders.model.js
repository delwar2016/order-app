"use strict";

const { Order } = require('../schemas/orders.schema');
const { User } = require('../schemas/users.schema');
const Promise = require('bluebird');
const _ = require('underscore');

/**
 * save new order
 * @param orderData
 */
module.exports.saveNewOrder = orderData => {
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
    return order.save();
  });
};
/**
 * update order status
 * @param orderId
 * @param orderStatus
 */
module.exports.saveOrderStatus = (orderId, orderStatus) => {
  return Order.findOne({_id: orderId}, 'status').then(order => {
    if (!order) {
      throw new Error('Order not found');
    }
    if (orderStatus === 'canceled' && _.indexOf(['confirmed', 'delivered'], order.status) !== -1) {
      throw new Error('Confirmed/ delivered order can not be canceled');
    }
    order.status = orderStatus;
    return order.save();
  });
};