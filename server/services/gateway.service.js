"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
	name: "gateway",
	mixins: [ApiGateway],

	settings: {
		port: process.env.PORT || 3000,
		routes: [{
      cors: {
        origin: "*",
        methods: ["GET", "OPTIONS", "POST"],
        credentials: true
      },
      path: '/user',
      authorization: false,
      aliases: {
        "POST authenticate": "auth.authenticate",
        "POST register": "auth.registerUser"
      }
    },{
      path: '/api',
      aliases: {
        "POST order/create": "orderApp.createOrder",
        "PUT order/cancel/:id": "orderApp.cancelOrder",
        "GET order/check_status": "orderApp.getOrderStatus",
        "GET stats": "stat.snapshot"
      },
      authorization: true,
      onBeforeCall(ctx, route, req, res) {
        this.logger.info("onBeforeCall in protected route");
        ctx.meta.authToken = req.headers["authorization"];
      },

      onAfterCall(ctx, route, req, res, data) {
        this.logger.info("onAfterCall in protected route");
        res.setHeader("X-Custom-Header", "Authorized path");
        return data;
      },

      // Route error handler
      onError(req, res, err) {
        res.setHeader("Content-Type", "text/plain");
        res.writeHead(err.code || 500);
        res.end("Route error: " + err.message);
      }
		}],
    bodyParsers: {
      json: true,
      urlencoded: { extended: true }
    }
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
            //console.log("decoded data", decoded);
            // If authorization was success, we set the user entity to ctx.meta
            return ctx.call("auth.getUserByID", { id: decoded.id }).then(user => {
              ctx.meta.user = user;
              return Promise.resolve(ctx);
              this.logger.info("Logged in user", user);
            });
          })
          .catch(err => {
            if (err instanceof MoleculerError)
              return this.Promise.reject(err);
            return this.Promise.reject(new UnAuthorizedError(ERR_INVALID_TOKEN));
          });
      } else
        return this.Promise.reject(new UnAuthorizedError(ERR_NO_TOKEN));
		}
	}
};
