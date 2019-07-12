'use strict';

const http = require('http');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8000;

// server.use((req, res, next) => {
//   const auth = { login: 'admin', password: 'admin' }; // change this

//   const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
//   const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');

//   if (login && password && login === auth.login && password === auth.password) {
//     return next();
//   }

//   res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
//   res.status(401).send('Permission denied.'); // custom message
// });

server.use(middlewares);
server.use(router);
server.use(jsonServer.bodyParser);
server.listen(port, () => console.log('Server started at port:', port));

setInterval(() => http.get('http://headway-json.herokuapp.com'), 180000);
