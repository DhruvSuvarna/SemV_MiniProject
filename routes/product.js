const express = require('express');
const product = express();

product.route('/')
.get((req, res)=>{
    res.render('product');
})

module.exports = product;