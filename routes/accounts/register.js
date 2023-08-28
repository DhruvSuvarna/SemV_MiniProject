const express = require('express');
const bodyParser = require("body-parser");
const register = express();
//error prone
// const  Consumer= require('../../models/consumer_schema');
// const   Farmer=require('../../farmer_schema');

register.use(bodyParser.urlencoded({extended: true}));
register.route('/farmer')
.get((req, res)=>{
    res.render('register_farmer');
})
.post((req, res)=>{
    // console.log(req.body);
    // const farmerFirstName=req.body.firstName;
    // const farmerLastName=req.body.lastName;
    // const farmerEmail=req.body.email;
    // const farmerPassword=req.body.password;
    // const farmerPhoneNo=req.body.phone;
    // const farmerCity=req.body.city;
    // const farmerState=req.body.state;
    
    // const newFarmer=new Farmer({
    //   firstname:farmerFirstName,
    //    lastname:farmerLastName,
    //    email:farmerEmail,
    //    password:farmerPassword,
    //    phoneNo:farmerPhoneNo,
    //    city:farmerCity,
    //    state:farmerState,
    // })

    // newFarmer.save();
    // res.send("Registered successfully");
});

register.route('/customer')
.get((req, res)=>{
    res.render('register_consumer');
})
.post((req, res)=>{
    // console.log(req.body);
    // const consumerFirstName=req.body.firstName;
    // const consumerLastName=req.body.lastName;
    // const consumerEmail=req.body.email;
    // const consumerPassword=req.body.password;
    // const consumerPhoneNo=req.body.phone;
    // const consumerCity=req.body.city;
    // const consumerState=req.body.state;
    
    // const newconsumer=new Consumer({
    //   firstname:consumerFirstName,
    //    lastname:consumerLastName,
    //    email:consumerEmail,
    //    password:consumerPassword,
    //    phoneNo:consumerPhoneNo,
    //    city:consumerCity,
    //    state:consumerState,
    // })

    // newconsumer.save();
    // res.send("Registered successfully");
});

module.exports = register;