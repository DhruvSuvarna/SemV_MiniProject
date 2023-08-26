const express = require('express');
const product = express();
const productInfo = require('../productInfo');

product.route('/')
.get((req, res)=>{
    res.render('products', {productInfo: productInfo});
})

module.exports = product;