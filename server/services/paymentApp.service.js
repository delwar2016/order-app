"use strict";

const db = require('../db/MongooseConnector').MongooseConnector()
const PaymentModel = require('../db/models/payments.model');
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
      return PaymentModel.verifyPayment(ctx.params).then(order => {
        return {
          status: 200,
          message: 'success',
          result: order
        };
      });
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