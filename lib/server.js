'use strict';

// import axios from 'axios';
import database from '../db.json';

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8060;

server.use(middlewares);
server.use(router);
server.listen(port);

console.log('Server started at port:', port);

//setTimeout(() => {
//  axios.get('registeredUsers');
//}, 1000);

// const getDB = () => {
//   axios.get('../db.json').then(data => console.log(data));
// };

const createDB = () => {
  // const databaseWrapper = document.getElementById('db');

  database.registeredUsers.map(user => {
    console.log(user);
  });
};

// getDB();
createDB();
