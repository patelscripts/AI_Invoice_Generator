require("dotenv").config();
const express = require("express");
const app = express();

const cors  = require("cors");
const path = require("path");
const connectDB = require('./config/db')

// middleware to handle CORS
app.use(
    cors({
        origin : "*",
        methods : ["GET","POST","DELETE","PUT"],
        allowedHeaders:["Content-type","Authorixation"]
    })
);

//connect database
connectDB();

//Routes here

// start server

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`server is running on the port : ${PORT}`)
})