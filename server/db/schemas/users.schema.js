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
userSchema.virtual('id').get(function () {
  return this._id;
});
userSchema.set('toJSON', {
  virtuals: true
});
module.exports.User = mongoose.model('user', userSchema);
