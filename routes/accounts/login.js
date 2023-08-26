const express = require('express');
const login = express();

login.route('/')
.get((req, res)=>{
    res.render('login');
})
.post((req, res)=>{
    console.log("login success!");
    res.redirect('../../');
})

module.exports = login;