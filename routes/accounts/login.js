const express = require('express');
const login = express();
const { Farmer, Consumer } = require('../../models/user')

login.route('/')
.get((req, res)=>{
    res.render('login');
})
.post((req, res)=>{
    const role = req.body.role;
    const username = req.body.username;
    const password = req.body.password;
    if(role == "farmer"){
        Farmer.find()
        .then((Farmers)=>{
            Farmers.forEach(Farmer=>{
                if(Farmer.username === username){
                    if(Farmer.password === password){
                        res.send("Login successful");
                    } else {
                        res.send("Invalid password");
                    }
                } else {
                    res.send("username does not exist");
                }
              }
            )
            
        })
        .catch(err=>console.log(err));
    }
});

module.exports = login;