const express = require('express');
const register = express();
const { Farmer, Consumer } = require('../../models/user')

register.route('/farmer')
.get((req, res)=>{
    res.render('register_farmer');
})
.post((req, res)=>{
    const newFarmer=new Farmer({
         username: req.body.username,
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         email: req.body.email,
         password: req.body.password,
         phone: req.body.phone,
         city: req.body.city,
         state: req.body.state
    });
  
    newFarmer.save()
    .then(res.send("Registered successfully"))
    .catch(err=>console.log(err));
});        

register.route('/consumer')
.get((req, res)=>{
    res.render('register_consumer');
})
.post((req, res)=>{
    const newConsumer=new Consumer({
         username: req.body.username,
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         email: req.body.email,
         password: req.body.password,
         phoneNo: req.body.phone,
         city: req.body.city,
         state: req.body.state
    });
  
    newFarmer.save();
    res.send("Registered successfully");
}); 

module.exports = register;