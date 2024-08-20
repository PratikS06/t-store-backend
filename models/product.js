const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema;


var productSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },
    discription:{
        type:String,
        required:true,
        trim:true,
        maxlength:1000
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        maxlength:32
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
      },
    stock:{
        type:Number,
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String,
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Product", productSchema);
