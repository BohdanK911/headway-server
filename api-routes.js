// api-routes.js
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function(req, res) {
  res.json({
    status: 'API is Working',
    message: 'Welcome to API'
  });
});
// Import contact controller
const userController = require('./userController');
// Contact routes
router
  .route('/registeredUsers_308b1b02d690')
  .get(userController.index)
  .post(userController.new);

router
  .route('/registeredUsers_308b1b02d690/:_id')
  .get(userController.view)
  .patch(userController.update)
  .put(userController.update)
  .delete(userController.delete);

// Export API routes
module.exports = router;
