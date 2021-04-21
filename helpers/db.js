const config = require("./../config/config");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI || config.connectionString, {
  useCreateIndex: true,
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;

module.exports = {
  User: require("../user/user.model"),
  Appoint: require("../appoint/appoint.model")
};
