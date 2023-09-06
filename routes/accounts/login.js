const express = require('express');
const login = express();
const { Farmer, Consumer } = require('../../models/user')

login.get('/ui', (req, res)=>{
    res.render('login_ui');
})

login.route('/')
.get((req, res)=>{
    res.render('login');
})
.post((req, res)=>{
    const role = req.body.role;
    const username_email = req.body.username_email;
    const password = req.body.password;
    if(role == "farmer"){
        Farmer.find()
        .then((Farmers)=>{
            Farmers.forEach(Farmer=>{
                if(Farmer.username === username_email){
                    if(Farmer.password === password){
                        res.send("Login successful");
                    } else {
                        res.send("Invalid password");
                    }
                } else if (Farmer.email === username_email){
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
    else if (role == "consumer"){
        Consumer.find()
        .then((Consumers)=>{
            Consumers.forEach(Consumer=>{
                if(Consumer.username === username){
                    if(Consumer.password === password){
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