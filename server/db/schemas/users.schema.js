/**
 * Created by emtiaj on 3/31/17.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

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

const User = mongoose.model('User', userSchema);

module.exports.User = User;
