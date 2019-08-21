"use strict";
const os = require("os");
module.exports = {
  nodeID: (process.env.NODEID ? process.env.NODEID + "-" : "") + os.hostname().toLowerCase(),
  logger: true,
  logLevel: "info",
  logFormatter: "default",
  transporter: "Redis",
  metrics: false,
  cacher: true,
  serializer: "JSON",
  requestTimeout: 10 * 1000
};