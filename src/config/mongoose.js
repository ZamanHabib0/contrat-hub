const mongoose = require('mongoose');
const { mongo, env } = require('./vars');

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/
exports.connect = () => {
    try{
        mongoose.connect( "mongodb+srv://admin:o0eEzpd3kIesAp8Q@cluster0.epczlws.mongodb.net/", {
            useNewUrlParser: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
            useUnifiedTopology: true,
            // keepAlive: 1,
          } 
        );
        return mongoose.connection;
    }
    catch (error){
      console.log("asfasfsdfsd")
        console.log("error: ",error)
    }

};
