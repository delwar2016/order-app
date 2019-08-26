"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
	name: "gateway",
	mixins: [ApiGateway],

	settings: {
    cors: {
      origin: "*",
      methods: ["GET", "OPTIONS", "POST", "PUT"],
      credentials: false
    },
		port: process.env.PORT || 3000,
		routes: [{
      path: '/user',
      authorization: false,
      aliases: {
        "POST authenticate": "auth.authenticate",
        "POST register": "auth.registerUser"
      },
      bodyParsers: {
        json: true,
        urlencoded: { extended: true }
      }
    },{
      bodyParsers: {
        json: true,
        urlencoded: { extended: true }
      },
      path: '/api',
      aliases: {
        "POST order/create": "orderApp.createOrder",
        "GET orders": "orderApp.getOrders",
        "PUT order/cancel/:id": "orderApp.cancelOrder",
        "GET order/check_status": "orderApp.getOrderStatus",
        "GET stats": "stat.snapshot"
      },
      authorization: true,

      // Route error handler
      onError(req, res, err) {
        res.setHeader("Content-Type", "text/plain");
        res.writeHead(err.code || 500);
        res.end("Route error: " + err.message);
      }
		}]
	},
  methods: {
    /**
     * Authorize the request
     *
     * @param {Context} ctx
     * @param {Object} route
     * @param {IncomingRequest} req
     * @returns {Promise}
     */
    authorize(ctx, route, req) {
      let authValue = req.headers["authorization"];
      if (authValue && authValue.startsWith("Bearer ")) {
        let token = authValue.slice(7);
        // Verify JWT token
        return ctx.call("auth.verifyToken", { token })
          .then(decoded => {
            // If authorization was success, we set the user entity to ctx.meta
            this.logger.info("Logged in user", decoded);
            ctx.meta.user = decoded;
            return this.Promise.resolve(ctx);
          })
          .catch(err => {
            console.log('err', err)
            return this.Promise.reject(err);
          });
      } else
        return this.Promise.reject(new Error('unauthorized'));
		}
	}
};
