// contactModel.js
const mongoose = require('mongoose');

let date = new Date();

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
    type: Date,
    default: date.toLocaleString('uk-UA')
  }
});
// Export Contact model
const User = (module.exports = mongoose.model('user', userSchema));
module.exports.get = function(callback, limit) {
  User.find(callback).limit(limit);
};
