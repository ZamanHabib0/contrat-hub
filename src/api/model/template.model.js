const mongoose = require("mongoose")

const templateSchema = mongoose.Schema(
    {
           templateForm : {
            type : String,
            required : [true ," Template form Url is required"]
           },
           templateName : {
            type : String,
            required : [true ," Template name is required"]

           },
           description : {
            type : String,
           }
        }
);


module.exports = mongoose.model("template" , templateSchema)