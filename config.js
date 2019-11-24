const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  db_uri: process.env.MONGODB_URI,
};