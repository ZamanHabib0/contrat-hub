const path = require('path');
require('dotenv').config();


module.exports = {

  encryptionKey: process.env.ENCRYPTION_KEY,
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URI_LOCAL,
  },
  tokenKey : process.env.TOKEN_KEY
 


};
