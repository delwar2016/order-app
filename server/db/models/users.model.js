const { User } = require('../schemas/users.schema');
const config = require('../config');
const Promise = require('bluebird');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const passwordEncryption = password => {
  var salt = crypto.randomBytes(16).toString('base64');
  var encryptedPassword = crypto.createHmac('sha256', password);
  encryptedPassword = encryptedPassword.update(salt);
  encryptedPassword = encryptedPassword.digest('base64');
  return {
    password: encryptedPassword,
    hashValue: salt
  };
};

module.exports.verifyPassword = (password, username) => {
  return User.findOne({username: username}).lean().then(user => {
    if (!user) {
      throw new Error('Unauthorized user');
    }
    var salt = user.hash_value;
    var encryptedPassword = crypto.createHmac('sha256', password);
    encryptedPassword = encryptedPassword.update(salt);
    encryptedPassword = encryptedPassword.digest('base64');
    var isVerified = encryptedPassword === user.password;
    if (isVerified) {
      delete user.password;
      delete user.hash_value;
      delete user.__v;
      user.id = user._id;
      const key = config.secret;
      const token = jwt.sign(user, key, { expiresIn: 140000 });
      return {token, user};
    }
  });
};
module.exports.isAuthenticated = token => {
  const key = config.secret;
  return new Promise((resolve, reject) => {
    if (!token) return reject('invalid token');
    jwt.verify(token, key, function (err, decoded) {
      if (err) return reject(err);
      return decoded.data;
    });
  });
};

module.exports.saveUser = userData => {
  console.log('user', userData)
  return User.findOne({username: userData.username}).then(user => {
    if (!user) {
      let {password, hashValue } = passwordEncryption(userData.password);
      userData.password = password;
      userData.hash_value = hashValue;
      let user = new User(userData);
      return user.save();
    }
    return user;
  });
}