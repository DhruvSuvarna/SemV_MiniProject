const express = require('express');
const shop = express();

shop.route('/')
.get((req, res)=>{
    res.render('shop');
})

module.exports = shop;