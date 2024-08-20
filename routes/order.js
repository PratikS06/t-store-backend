const express = require("express")
const router = express.Router()

const {isSignedIn,isAuthenticate,isAdmin} = require("../controllers/auth")
const {getUserById,pushOrderInPurchaseList} = require("../controllers/user")

const {updateStock} =require("../controllers/product")
const {getOrderById,createOrder, getAllOrders,getOrderStatus,updateStatus} = require("../controllers/order")

router.param("userId",getUserById)
router.param("orderId",getOrderById)

//Atual Routes

//Create Order
router.post("/order/create/:userId",isSignedIn,isAuthenticate,pushOrderInPurchaseList,updateStock,createOrder)

//read || getAll route
router.get("/order/All/:userId",isSignedIn,isAuthenticate,isAdmin,getAllOrders)

//Update status & orderstatus

router.get("/order/status/orderId",isSignedIn,isAuthenticate,isAdmin,getOrderStatus)
router.post("/order/:orderId/status/:userId",isSignedIn,isAuthenticate,isAdmin,updateStatus)

module.exports = router