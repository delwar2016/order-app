"use strict";

module.exports = {
  name: "payment",

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

    verifyPayment (ctx) {

    },

    /**
     * get all product list
     * @param ctx
     * @returns {Promise.<string[]>}
     */
    makePayment (ctx) {
      return Promise.resolve(['product 1', 'product 2']);
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