"use strict";

module.exports = {
  name: "payment",
  events: {
    "order.created"(user) {
      console.log("User created:", user);
    }
  }
};