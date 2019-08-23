"use strict";
const os = require("os");
module.exports = {
  nodeID: (process.env.NODEID ? process.env.NODEID + "-" : "") + os.hostname().toLowerCase(),
  logger: true,
  logLevel: "info",
  logFormatter: "default",
  transporter: "Redis",
  requestTimeout: 5 * 1000,
  cacher: true,
  serializer: "JSON",
  circuitBreaker: {
    enabled: true
  },

  metrics: true,
  statistics: true
};