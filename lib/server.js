'use strict';

// import axios from 'axios';
// import database from '../db.json';

// const passport = require('passport-local'),
//   LocalStrategy = require('passport-local').Strategy;
const http = require('http');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8060;

// passport.use(
//   new LocalStrategy(function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   })
// );

server.use(middlewares);
server.use(router);
server.use(jsonServer.bodyParser);
server.listen(port);

console.log('Server started at port:', port);

setInterval(() => http.get('http://headway-json.herokuapp.com'), 180000);
