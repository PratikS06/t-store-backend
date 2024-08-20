const express = require("express")
const router = express.Router()

const {getAllUniqueCategories,getProductById,createProduct,getProduct,photo,updateProduct,deleteProduct,getAllProducts} = require("../controllers/product")
const {isSignedIn,isAuthenticate,isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//Params
router.param("userId",getUserById)
router.param("productId",getProductById)

//My Actual Routes

router.post("/product/create/:userId",isSignedIn,isAuthenticate,isAdmin,createProduct)

//read Product||get Products
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)
router.get("/products", getAllProducts);



//Update Product
router.put("/product/:productId/:userId",isSignedIn,isAuthenticate,isAdmin,updateProduct)

//Delete Product
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticate,isAdmin,deleteProduct)


//get All Unique Categories
router.get("/products/categories", getAllUniqueCategories);

module.exports = router;