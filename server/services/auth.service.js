"use strict";

module.exports = {
  name: "auth",
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
    getUserByID (ctx) {
      return Promise.resolve({id: '01', name: 'delwar'});
    },
    verifyToken (ctx) {
      return Promise.resolve({id: '01', name: 'delwar', token: ctx.token});
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