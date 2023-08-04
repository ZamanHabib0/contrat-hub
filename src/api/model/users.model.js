const mongoose = require('mongoose')

const authSchema = mongoose.Schema(
    {
           userName : {
            type : String,
            // required : true
            default : ""
           },
           email: {
            type:String,
            required:false,
            unique:false,
           },
           password : {
            type : String,
            // required : true,
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
        //    isAdmin : {
        //     type : Boolean,
        //     default : false,
        //    },
           tokenVersion : {
            type : Number,
            default : 0
           },
        },
        
);

authSchema.index({email:1})
module.exports = mongoose.model("user" , authSchema)
