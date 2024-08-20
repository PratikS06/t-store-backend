const express = require("express")
const { check } = require("express-validator")
const router = express.Router()

const {signout,signup,signin, isSignedIn} = require("../controllers/auth")


router.get("/signout",signout)

router.get("/test",isSignedIn,(req,res)=>{
    res.json(req.bot)
})

router.post("/signup",[check("name","name should be at least 3 letter").isLength({min:3}),
check("email","Email ID Required ").isEmail(),
check("password","Password should be at least 3 letter").isLength({min:3})],signup)

router.post("/signin",[
    check("email", "Valid Email ID Required ").isEmail().isLength({min:1}),
    check("password","Please Enter Valid Password").isLength({min:1})
],signin)



module.exports = router;