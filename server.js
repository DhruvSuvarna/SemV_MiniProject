// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const ejs = require('ejs');
// const accounts = require('./routes/accounts/accounts');
const shop = require('./routes/shop');
const product = require('./routes/product');
const authRoutes=require('./routes/authRoute.js');
const categoryRoutes=require("./routes/categoryRoute.js");
const productRoutes=require("./routes/productRoutes.js");
const morgan=require("morgan");
const cors=require("cors");
const port = 9001;



const app = express();
//middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.use('/api/v1/auth', authRoutes)
// Connect to MongoDB using Mongoose
mongoose.connect("mongodb+srv://Shibhya:Shibhya@miniproject.7sjqtbg.mongodb.net/?retryWrites=true&w=majority")
.then(()=>console.log("MongoDB Connected!"))
.catch((err)=>console.log(err));

// app.use('/accounts', accounts);
app.use('/shop', shop)
app.use('/product', product)

app.get("/", (req, res)=>{
    res.render('index');
});

// app.get("/auth/google", (req,res) =>{
//     res.send("Hellow World");
// })
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});