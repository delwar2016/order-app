"use strict";

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
		 * get all product list
     * @param ctx
     * @returns {Promise.<string[]>}
     */
    productList (ctx) {
			return Promise.resolve(['product 1', 'product 2']);
		},
    /**
		 * get product by id
     * @param ctx
     * @returns {string}
     */
    productById (ctx) {
      return Promise.resolve(`product by id, ${ctx.params.id}`);
		},
    createOrder (ctx) {
    	let orderdetail = ctx.params;
      this.broker.emit("order.created",orderdetail);
      return Promise.resolve(ctx.params.payload);
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