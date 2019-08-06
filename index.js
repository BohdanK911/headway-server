let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const path = require('path');
let app = express();

let apiRoutes = require('./api-routes');

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true });

// Heroku Mongoose connection
// mongoose.connect('mongodb://admin:headway1@ds259367.mlab.com:59367/heroku_7jctgxd1', {
//   useNewUrlParser: true
// });

var db = mongoose.connection;

// Added check for DB connection

if (!db) console.log('Error connecting db');
else console.log('DataBase connected successfully');

// Setup server port
var port = process.env.PORT || 8000;

// Send message for default URL
app.use('/', express.static('public'));

// Use Api routes in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function() {
  console.log('Running server on port ' + port);
});
