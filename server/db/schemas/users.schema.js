"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  hash_value: {
    type: String
  }
});
module.exports.User = mongoose.model('User', userSchema);
