// contactController.js
// Import contact model
const User = require('./userModel');
// Handle index actions
exports.index = function(req, res) {
  User.get(function(err, users) {
    if (err) {
      res.json({
        status: 'error',
        message: err
      });
    }
    res.json({
      status: 'ok',
      message: 'Users retrieved successfully',
      data: users
    });
  });
};
// Handle create contact actions
exports.new = function(req, res) {
  const user = new User();
  user.name = req.body.name ? req.body.name : contact.name;
  user.gender = req.body.gender;
  user.email = req.body.email;
  user.phone = req.body.phone;
  // save the contact and check for errors
  user.save(function(err) {
    // Check for validation error
    if (err) res.json(err);
    else
      res.json({
        message: 'New user created!',
        data: user
      });
  });
};
// Handle view contact info
exports.view = function(req, res) {
  User.findById(req.params.contact_id, function(err, user) {
    if (err) res.send(err);
    res.json({
      message: 'User details loading...',
      data: user
    });
  });
};
// Handle update contact info
exports.update = function(req, res) {
  Contact.findById(req.params.user_id, function(err, user) {
    if (err) res.send(err);
    user.name = req.body.name ? req.body.name : contact.name;
    user.gender = req.body.gender;
    user.email = req.body.email;
    user.phone = req.body.phone;
    // save the contact and check for errors
    user.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: 'User Info updated',
        data: user
      });
    });
  });
};
// Handle delete contact
exports.delete = function(req, res) {
  Contact.remove(
    {
      _id: req.params.user_id
    },
    function(err, user) {
      if (err) res.send(err);
      res.json({
        status: 'success',
        message: 'User deleted'
      });
    }
  );
};
