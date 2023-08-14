const path = require('path');
require('dotenv').config();

module.exports = {


  encryptionKey: process.env.ENCRYPTION_KEY,
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URI,
  },
  tokenKey : process.env.TOKEN_KEY,
  hostBaseUrl : process.env.Host_Base_Url,
  EmailService: process.env.Email_Service,
  senderEmail: process.env.Sender_Email,
  senderPassword: process.env.Sender_Pass,
 


};
