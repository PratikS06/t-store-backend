const mongoose = require("mongoose")
const express = require("express")
const app = express()
require("dotenv").config()

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors") 

// calling My Routes
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const categoryRoute = require("./routes/category")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB CONNECTED")
}).catch(()=>{
    console.log("Failed To Connect DB!!!")
})


//MiddleWares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//My Routes
app.use("/api",authRoute)
app.use("/api",userRoute)
app.use("/api",categoryRoute)
app.use("/api",productRoute)
app.use("/api",orderRoute)

//My Port
const port = process.env.PORT || 1707;


app.listen(port,()=>{
    console.log(`App is running at PORT: ${port} `)
})