'use strict';

//import axios from 'axios';
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8060;

server.use(middlewares);
server.use(router);
server.listen(port);

console.log(port);

//setTimeout(() => {
//  axios.get('registeredUsers');
//}, 1000);
