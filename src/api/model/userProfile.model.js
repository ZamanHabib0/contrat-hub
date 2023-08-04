const mongoose = require("mongoose")

const profileSchema = mongoose.Schema(
    {
           profileImage : {
            type : String,
            default : "http://localhost:8080/image/file-1687951603350-974325287.jpg"
           },
           fullName : {
            type : String,
            required : true,
           },
           bio : {
            type : String,
           },
           age : {
            type : Number
           },
          
           gender : {
            type : String,
           },
           phoneCode: {
            type : Number,
           },
           PhoneNumber : {
            type : Number,
           },
           userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "registeredUser"
           },
           address : [{
            street: {
                type: String,
                required: true
              },
              city: {
                type: String,
                required: true
              },
              state: {
                type: String,
                required: true
              },
              country: {
                type: String,
                required: true
              },
              postalCode: {
                type: String,
                required: true
              },
              addressType : {
                type : String,
                required: true
              }
 
 
            }],
            favoriteProduct : [{
              productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
              },
              createdAt: {
                type: Date,
                default: Date.now
              },
            
            }]
        }
);


module.exports = mongoose.model("userProfile" , profileSchema)