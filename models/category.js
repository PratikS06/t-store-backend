const mongoose = require("mongoose")


var categorySchema = new mongoose.Schema({

    name:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        maxlength:32,
    }

},{
    timestamps:true
})

module.exports = mongoose.model("Category",categorySchema)