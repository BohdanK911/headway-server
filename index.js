const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const { port, db_uri } = require('./config');
const apiRoutes = require('./api-routes');

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Heroku Mongoose connection
mongoose.connect(db_uri, {
  useNewUrlParser: true
});

const db = mongoose.connection;

// Added check for DB connection
!db ? console.error('Error connecting db') : console.log('DB connected successfully');

app.use(cors({ origin: '*', credentials: true }));

// Send message for default URL
app.use('/', express.static('public'));

// Use Api routes in the App
app.use('/api', apiRoutes);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Launch app to listen to specified port
app.listen(port || 8000, function() {
  console.log('Running server on port ' + port);
});

const httpGet = url => http.get(url);

setInterval(() => httpGet('http://headway-json.herokuapp.com'), 300000);
