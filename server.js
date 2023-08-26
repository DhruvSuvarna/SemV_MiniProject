const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const ejs = require('ejs');
const accounts = require('./routes/accounts/accounts.js');
const products = require('./routes/products.js');
const port = 4000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
 
// Connect to MongoDB using Mongoose

app.use('/accounts', accounts);
app.use('/products', products)


app.get("/", (req, res)=>{
    res.render('index');
});


app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});