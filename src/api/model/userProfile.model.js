const mongoose = require("mongoose")

const profileSchema = mongoose.Schema(
    {
           profileImage : {
            type : String,
            default : "http://localhost:8080/image/file-1687951603350-974325287.jpg"
           },
           firstName : {
            type : String,
           },
           lastName : {
            type : String,
           },
           phoneNumber : {
            type : String,
           },
           userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            required : true
           },
           timeZone : {
            type : String,
           },
           address : {
            streetAdress: {
                type: String,
              },
            streetAdressLine2: {
                type: String,
              },
              city: {
                type: String,

              },
              state: {
                type: String,

              },
              country: {
                type: String,
              },
              zip: {
                type: String,
              },
              // addressType : {
              //   type : String,
              //   required: true
              // }
            },
        }
);


module.exports = mongoose.model("userProfile" , profileSchema)