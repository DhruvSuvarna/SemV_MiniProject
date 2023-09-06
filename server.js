require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const ejs = require('ejs');
const accounts = require('./routes/accounts/accounts');
const shop = require('./routes/shop');
const product = require('./routes/product');
const port = 9001;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MongoDB_URI)
.then(()=>console.log("MongoDB Connected!"))
.catch((err)=>console.log(err));

app.use('/accounts', accounts);
app.use('/shop', shop)
app.use('/product', product)

app.get("/", (req, res)=>{
    res.render('index');
});

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});