const mongoose = require("mongoose")

const draftSchema = mongoose.Schema(
    {
           contractForm : {
            type : String,
            required : [true ," Template form Url is required"]
           },
           contractName : {
            type : String,
            required : [true ," Contract name is required"]
           },
           companySignerDetail : {

           companyName : {
            type : String,
            required : [true ," company name is required for contact"]
           },
           signerEmail : {
            type : String,
            required : [true ," Signer email is required for contact"]
           }
           },
           recipients : {
          name : {
            type : String,
            required : [true ,"recipients name  is required for contact"]
          },
         email :  {
            type : String,
            required : [true ,"Recipients email is required for contact"]
          }
        },
        canvasDetail : [
            {
                canvasData : {
                    type : String,
                },
                xCoordinate : {
                    type : Number,
                },
                yCoordinate : {
                    type : Number,
                },
                brushColor : {
                    type : String,
                },
                brushRadius : {
                    type : String,
                },
                canvasWidth : {
                    type : String,
                },
                canvasHeight : {
                    type : String,
                }
            }
        ],
        contractStatus : {
            type : String,
            enum: ["draft", "send","opened" ,"Completed", "Cancelled"],
            default : "draft"
        }
           
        },
       
);


module.exports = mongoose.model("contract" , draftSchema)