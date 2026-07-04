require("dotenv").config();
const express = require("express");
const app = express();

const cors  = require("cors");
const path = require("path");
const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes')
const aiRoutes = require("./routes/aiRoutes")
// middleware to handle CORS
app.use(
    cors({
        origin : "*",
        methods : ["GET","POST","DELETE","PUT"],
        allowedHeaders:["Content-type","Authorization"]
    })
);

//connect DATABASE
connectDB();

//Middlewares
app.use(express.json());

//Routes here
app.use("/api/auth",authRoutes)
app.use("/api/invoices",invoiceRoutes)
app.use("api/ai",aiRoutes)
// start server

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`server is running on the port : ${PORT}`)
})