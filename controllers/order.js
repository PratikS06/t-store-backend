const {Order,ProductCart} = require("../models/order")

exports.getOrderById = (req,res,id,next)=>{

    Order.findById(id)
    .populate("products.product","name price")
    .exce((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"Failed To Get Order ID"
            })
        }
        req.order = order
        next()
    })
}

exports.createOrder=(req,res)=>{
    req.body.order.user = req.profile
    const order = new Order(req.body.order)

    order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"Failed To Save Order In DB"
            })
        }
        res.json(order)
    })
}

exports.getAllOrders =(req,res)=>{
    Order.find()
    .populate("user","_id name")
    .exce((err,orders)=>{
        if(err){
            return res.status(400).json({
                error:"No Order Found In DB"
            })
        }
        res.json(orders)
    })
}


exports.getOrderStatus=(req,res)=>{
    res.json(Order.schema.path("status").enumValues)
}

exports.updateStatus=(req,res)=>{
    Order.findByIdAndUpdate(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order)=>{
        if(err){
            return res.status(400).json({
                error:"Failed To Update Order"
            })
        }
        res.json(order)
    })

}