
const express = require("express");
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const vendorRoutes = require('./routes/vendorRoutes')
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const path = require('path')
dotenv.config()
const app = express()

const PORT = 4000;


mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("Mongo db connected sucessfully"))
    .catch((error)=>console.log(error))

app.use(bodyParser.json())
app.use('/vendor',vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))
    



app.use('/home',(req,res)=> {
    res.send("<h1>welcome to cpr")
})


app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}`);
})

