const jwt = require("jsonwebtoken")
require("dotenv").config();
const model = require('../model/index');

const jwtMiddeware =  (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_KEY, async (err, user) => {
    try {
      
  
    if (err) return res.sendStatus(403);
    req.user = user;
    const userdata = await model.user.findOne({ _id : user.user_id });

    if(userdata.tokenVersion == user.tokenVersion){
      console.log(user)
      next();
    }else{
      return res.sendStatus(403);
    }
  
  } catch (error) {
    res.status(404).json({ error });
  }
  }
  
  );
  

};

module.exports = jwtMiddeware;