const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const apiRoutes = require('./api-routes');

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
// mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true });

// Heroku Mongoose connection
mongoose.connect('mongodb://admin:headway1@ds259367.mlab.com:59367/heroku_7jctgxd1', {
  useNewUrlParser: true
});

const db = mongoose.connection;

// Added check for DB connection

if (!db) console.log('Error connecting db');
else console.log('DataBase connected successfully');

// Setup server port
const port = process.env.PORT || 8000;

// Send message for default URL
app.use('/', express.static('public'));

// Use Api routes in the App
app.use('/api', apiRoutes);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://headwayua.com/'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Launch app to listen to specified port
app.listen(port, function() {
  console.log('Running server on port ' + port);
});
