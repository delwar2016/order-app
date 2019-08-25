"use strict";

const DbService = require("moleculer-db");
const db = require('../db/MongooseConnector').MongooseConnector()
const UserModel = require('../db/models/users.model');
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
     * authenticate
     * @param ctx
     */
    authenticate (ctx) {
      return UserModel.verifyPassword(ctx.params.password, ctx.params.username).then(res => {
        return {
          status: 200,
          message: 'success',
          result: {
            token: res.token,
            user: res.user
          }
        };
      });
    },

    /**
     * verifyToken
     * @param ctx
     */
    verifyToken (ctx) {
      return UserModel.isAuthenticated(ctx.token);
    },
    /**
     * registerUser
     * @param ctx
     */
    registerUser (ctx) {
      return UserModel.saveUser(ctx.params).then(user => {
        return {
          status: 200,
          message: 'success',
          result: {
            user: user
          }
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