var mongoose = require('mongoose');


exports.MongooseConnector = function () {
  if (mongoose.connection.db == null) {
    mongoose.Promise = require('bluebird');
    const serverOptions = {
      poolSize: 100,
      socketOptions: {
        socketTimeoutMS: 60000
      }
    };

    return mongoose.connect('mongodb://localhost/order-app', {server: serverOptions}).catch(function (ee) {
      console.log('error ', ee);
    });
  }
};

