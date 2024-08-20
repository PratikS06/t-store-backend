const express = require("express")
const { isSignedIn, isAuthenticate, isAdmin } = require("../controllers/auth")
const { getUserById, getUser,getAllUser, updateUser, userPurchaseList } = require("../controllers/user")

const router = express.Router()


router.param("userId",getUserById)

router.get("/user/:userId",isSignedIn,isAuthenticate,getUser)
// Assignment Part Modifiy by only Admin can access to show All data from DB  
router.get("/users/:userId",isSignedIn,isAdmin,getAllUser)

router.put("/updateuser/:userId",isSignedIn,isAuthenticate,updateUser)

router.get("/order/user/:userId",isSignedIn,isAuthenticate,userPurchaseList)

module.exports = router