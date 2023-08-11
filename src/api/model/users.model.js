const mongoose = require('mongoose')

const authSchema = mongoose.Schema(
    {
           userName : {
            type : String,
            required : [true, "UserName is required"]
    
           },
           email: {
            type:String,
            required : [true, "email is required"]
           },
           password : {
            type : String,
            required : [true, "password is required"]
           },
           otp : {
            type : Number
           },
           isActive : {
            type : Boolean,
            default : false,  
           },
           isProfile : {
            type : Boolean,
            default : false,
           },
           companyCreated : {
            type : Boolean,
            default : false,
           },
           tokenVersion : {
            type : Number,
            default : 0
           },
        },
        
);

authSchema.index({email:1})
module.exports = mongoose.model("user" , authSchema)
