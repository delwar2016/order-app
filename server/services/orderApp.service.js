"use strict";
module.exports = {
	name: "orderApp",

	/**
	 * Service settings
	 */
	settings: {
    metrics: true,
    statistics: true
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
		  return Promise.resolve('Order will be created here');
    },
    /**
     * cancel order
     * @param ctx
     */
    cancelOrder (ctx) {
      return Promise.resolve('Order will be canceled here');
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
     * get orders
     * @param ctx
     */
    getOrders (ctx) {

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