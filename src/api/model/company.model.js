const mongoose = require('mongoose')

const companySchema = mongoose.Schema(
    {
           companyName : {
            type : String,
            required : [ true , "Company name is required"]
           },
           adminEmail: {
            type:String,
            required : [ true , "Admin email is required"]
           },
           corporateForm : {
            type:String,
           },
           state : {
            type : String,
            required : [ true , "company state is requred"]
           },
           formationState : {
            type : String,
            required : [ true , "company state where it is formed is requred"]
           },
           companyContact : {
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
            members : [
              {
                name : {
                    type: String,
                  },
                title : {
                    type: String,
                  },
                permission: {
                    type: String,
                    enum: ['sign', 'admin', 'upload' , 'view' , 'draft' , "approve"],
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
            ],
            userId : {
              type : mongoose.Schema.Types.ObjectId,
              ref : "user",
              required : true
             },
  
        },
        
);

module.exports = mongoose.model("company" , companySchema)
