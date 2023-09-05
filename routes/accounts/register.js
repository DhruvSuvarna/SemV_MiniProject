const express = require('express');
const register = express();
const { Farmer, Consumer } = require('../../models/user');
const { isUndefined } = require('lodash');

register.route('/farmer')
.get((req, res)=>{
    res.render('register_farmer');
})
.post((req, res)=>{
    let username = req.body.username;
    let email = req.body.email;
    let phone = req.body.phone;
    Farmer.find()
    .then((Farmers)=>{
        const check = 1;
        if (Farmers){
            Farmers.forEach(F=>{
                if (F.username === username){
                    res.send("username already exists");
                    check = 0;
                }
                else if (F.email === email){
                    res.send("email already exists");
                    check = 0;
                }
                else if (F.phone === phone){
                    res.send("phone no. already exists");
                    check = 0;
                }
            })
            if (check === 1){
                const newFarmer=new Farmer({
                    username: req.body.username,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: email,
                    password: req.body.password,
                    phone: phone,
                    city: req.body.city,
                    state: req.body.state
                });
                
                newFarmer.save();
                res.send("Registered successfully");
            }
        } else {
            const newFarmer=new Farmer({
                username: username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: email,
                password: req.body.password,
                phone: phone,
                city: req.body.city,
                state: req.body.state
            });
            newFarmer.save();
            res.send("Registered successfully");
        }
    })
});        

register.route('/consumer')
.get((req, res)=>{
    res.render('register_consumer');
})
.post((req, res)=>{
    let username = req.body.username;
    let email = req.body.email;
    let phone = req.body.phone;
    phone = phone? phone: undefined;
    Consumer.find()
    .then((Consumers)=>{
        if (Consumers){
            const check = 1;
            Consumers.forEach(C=>{
                if (C.username === username){
                    res.send("username already exists");
                    check = 0;
                }
                else if (C.email === email){
                    res.send("email already exists");
                    check = 0;
                }
                else if (C.phone === phone){
                    res.send("phone no. already exists");
                    check = 0;
                }
            })
            if (check === 1){
                const newConsumer=new Consumer({
                    username: req.body.username,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: email,
                    password: req.body.password,
                    phone: phone,
                    city: req.body.city?req.body.city: undefined,
                    state: req.body.state?req.body.state: undefined
                });
                
                newConsumer.save();
                res.send("Registered successfully");
            }
        } else {
            const newConsumer=new Consumer({
                username: username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: email,
                password: req.body.password,
                phone: phone,
                city: req.body.city?req.body.city: undefined,
                state: req.body.state?req.body.state: undefined
            });
            newConsumer.save();
            res.send("Registered successfully");
        }
    })
}); 

module.exports = register;