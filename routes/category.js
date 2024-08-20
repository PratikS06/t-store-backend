const express = require("express")
const router = express.Router();

const {isSignedIn,isAdmin,isAuthenticate} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory, removeCategory} = require("../controllers/category")



router.param("userId",getUserById)
router.param("categoryId",getCategoryById)

//actual routes

router.post("/category/create/:userId",isAdmin,isSignedIn,isAuthenticate,createCategory)

//read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);


//Update Category
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticate,isAdmin,updateCategory)
//Delete Category

router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticate,isAdmin,removeCategory)


module.exports = router