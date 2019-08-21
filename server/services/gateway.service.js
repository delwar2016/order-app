"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
	name: "gateway",
	mixins: [ApiGateway],

	settings: {
		port: process.env.PORT || 3000,

		routes: [{
      aliases: {
        "GET products": "orderApp.productList",
        "GET products/:id": "orderApp.productById",
				"POST order": "orderApp.createOrder"
			}
		}],
    bodyParsers: {
      json: true,
      urlencoded: { extended: true }
    }
	}
};
