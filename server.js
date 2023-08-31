// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const ejs = require('ejs');
let cities=[];
let index=0;
// const session = require('express-session');
// const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose');
// const GoogleStrategy = require('passport-google-oauth20/lib/strategy.js');
// const findOrCreate = require('mongoose-findorcreate');
// const consumer =  require('./models/consumer_schema');
// const farmer = require('./models/farmer_schema');
const accounts = require('./routes/accounts/accounts');
const products = require('./routes/products');
const port = 4000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// app.use(passport.initialize());
// app.use(passport.session());

// Connect to MongoDB using Mongoose
// mongoose.connect('mongodb://127.0.0.1:27017/AgriGo')
// .then(()=>console.log("MongoDB Connected!"))
// .catch((err)=>console.log(err));

app.use('/accounts', accounts);
app.use('/products', products)

app.get("/", (req, res)=>{
    res.render('index');
});
app.get('/test',(req,res)=>{
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "WExOZ3ZyQ1VPNHlqMkNOeDFDUGhuN3Z2QmVUbDFFREMxZHNtMmRIWg==");
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
        };

    fetch("https://api.countrystatecity.in/v1/countries/IN/states/MH/cities", requestOptions)
    .then(response => response.json())
    .then(result =>{
       res.render('test',{cities:result})
    })
    .catch(error => console.log('error', error));
  
})
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});


