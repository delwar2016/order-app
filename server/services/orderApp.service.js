"use strict";

const db = require('../db/MongooseConnector').MongooseConnector()
const OrderModel = require('../db/models/orders.model');
module.exports = {
	name: "orderApp",

	/**
	 * Service settings
	 */
	settings: {
	},

	/**
	 * Service dependencies
	 */
	dependencies: [],	

	/**
	 * Actions
	 */
	actions: {

    /**
     * create the order
     * @param ctx
     */
		createOrder (ctx) {
		  console.log('ctx.params', ctx.params)
      ctx.params.username = ctx.meta.user.username;
      return OrderModel.saveNewOrder(ctx.params).then(order => {
        return {
          status: 200,
          message: 'success',
          result: order
        };
      });
    },
    getOrders (ctx) {
      return OrderModel.getOrdersByUserId(ctx.meta.user._id).then(orders => {
        return {
          status: 200,
          message: 'success',
          result: orders
        };
      });
    },
    /**
     * cancel order
     * @param ctx
     */
    cancelOrder (ctx) {
      return OrderModel.saveOrderStatus(ctx.params.id, 'canceled').then(orders => {
        return {
          status: 200,
          message: 'success',
          result: orders
        };
      });
    },
    /**
     * cancel order
     * @param ctx
     */
    deliveredOrder (ctx) {
      return OrderModel.saveOrderStatus(ctx.params.id, 'delivered').then(orders => {
        return {
          status: 200,
          message: 'success',
          result: orders
        };
      });
    },
    /**
     * get order status
     *
     * @param ctx
     * @returns {Promise.<string>}
     */
    getOrderStatus (ctx) {
      return Promise.resolve('Get order status');
    },
    /**
     * get order detail
     * @param ctx
     */
    getOrderDetail (ctx) {

    }
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};

// return this.broker.call("orderApp.getOrderStatus", {})
//   .then(res => {
//     console.log('res', res)
//   });