const express = require('express');
const register = express();

register.route('/farmer')
.get((req, res)=>{
    res.render('register_farmer');
})
.post((req, res)=>{
    console.log(req.body);
    res.send("Registered successfully");
});

module.exports = register;