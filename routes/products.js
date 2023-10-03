const express = require('express');
const product = express();
const productInfo = require('../productInfo');

product.route('/')
.get((req, res)=>{
    res.render('products', {productInfo: productInfo});
})
product.route('/xyz/hi')
.get((req, res)=>{
    res.json({products:['milk','eggs','bread','cake is a lie']});
})





module.exports = product;