var mongoose = require('mongoose');


exports.MongooseConnector = function () {
  if (mongoose.connection.db == null) {
    mongoose.Promise = require('bluebird');
    return mongoose.connect('mongodb://localhost/order-app', {useNewUrlParser: true }).catch(function (ee) {
      console.log('error ', ee);
    });
  }
};

