// contactModel.js
const mongoose = require('mongoose');
const moment = require('moment');
const now = moment();

// Setup schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  date: {
    type: String,
    required: false,
    default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
  }
});
// Export Contact model
const User = (module.exports = mongoose.model('user', userSchema));
module.exports.get = function(callback, limit) {
  User.find(callback).limit(limit);
};
