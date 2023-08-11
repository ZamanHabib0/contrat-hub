const express = require('express');
const bodyParser = require('body-parser');
const userRoutes= require('../api/routes/v1/user/index');
const path = require('path');
const bearerToken = require('express-bearer-token');
const cors = require("cors"); 

/**
* Express instance
* @public
*/
const app = express();


app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bearerToken());
app.use("/image", express.static(path.join("",  "public/images")));

app.use(cors());
app.use("/form", express.static(path.join("",  "public/templates")));


 app.use(express.static(path.join(__dirname, "../uploads")));

app.use('/v1/user', userRoutes);
app.get('/', (req ,res,next)=>{
  res.send("here we are")
})

module.exports = app;
