const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")


exports.getProductById=(req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:" Product ID Not Found"
            })
        }
        req.product= product;
        next()
    })    
}


exports.createProduct=(req,res)=>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true

    form.parse(req,(err,fields,file)=>{
        if(err){
            
            return res.status(400).json({
                error:"Problem With Image"
            })
            console.log(err);
        }

        //restriction on fields
        const {name,discription,price,category,stock} = fields;

        if(!name || !discription || !price || !category || !stock){
            return res.status(400).json({
                error:"Please Fill All Given Fileds"
            })
        }

        let product = new Product(fields)

        // Manage Files
        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error:"File Size To Big!!"
                })
            }
                product.photo.data = fs.readFileSync(file.photo.path)
                product.photo.contentType = file.photo.type
        }
        //Save In DB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Failed To Save Product In DB"
                })
            }
         res.json(product)   
        })

    })

}

exports.getProduct=(req,res)=>{
   
    req.product.photo = undefined;
    return res.json(req.product)
}

//middleware for getting photo only
exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)  // set photo in db contentType
        return res.send(req.product.photo.data)
    }

    next()
}

//Update Product
exports.updateProduct=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Problem With Image"
            })
        }

        //Updation Code Here
        let product = req.product;
        product = _.extend(product,fields)

        // Manage Files
        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error:"File Size To Big!!"
                })

                product.photo.data = fs.readFileSync(file.photo.path)
                product.photo.contentType = file.photo.type
            }
        }
        //Save In DB
        product.save((err,updatedProduct)=>{
            if(err){
                return res.status(400).json({
                    error:"Failed To Update Product In DB"
                })
            }
         res.json(updatedProduct)
            
        })

    })   

}

exports.deleteProduct=(req,res)=>{
    let product = req.product;
    
    product.remove((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Failed To Delete Product"
            })
        }
        res.json({
            message:`${product.name} is Deleted Successfully `,
            
            
        })
        console.log(`${product.name} is deleted Successfully form Database`);
    })
}

exports.getAllProducts=(req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) :(12) //use to set limit of products for get user  
    let sortBy = req.query.sortBy ? (req.query.sortBy) : "_id"  //use to sort products in sorted list  
    Product.find()
    .populate("category")
    .sort([[sortBy,"ascending"]])
    .select("-photo")                       // "-" is use to except photo we get all details about product
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Failed To Find All Products"
            })
        }
        res.json(products)
    })

}

exports.updateStock = (req,res,next)=>{

    let myOperaction = req.body.order.products.map(prod=>{
        return {
            updateOne:{
                filter:{_id: prod._id},
                update:{$inc:{stock:-prod.count,sold:+prod.count}}

            }
    }
        
        })

        Product.bulkWrite(myOperaction,{},(err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Bulk Operation Failed!!!"
                })
            }
            next()
        })
}

exports.getAllUniqueCategories = (req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Failed To Get All Unique Categories!!! "
            })
        }
        res.json(category)
    })
}