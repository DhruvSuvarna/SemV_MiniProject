const express = require('express');
const session=require("express-session");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate=require('mongoose-findorcreate');
const register = express();
const { Farmer, Consumer } = require('../../models/user');
const { isUndefined } = require('lodash');

register.use(session({
    secret:"Our secret.",
    resave:false,
    saveUninitialized:false
}));
register.use(passport.initialize());
register.use(passport.session());

passport.use(Consumer.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user);
  });
   
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

passport.use(new GoogleStrategy({
    clientID: "151280330340-k23r6i261c06c0t94pbetusb1jk2ug01.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:9001/accounts/register/consumer/auth/google/agrigo"
  
  },
  function(accessToken, refreshToken, profile, cb) {
   
    Consumer.findOne({ googleId: profile.id }).then((foundUser) => {
        if (foundUser) {
          return foundUser;
        } else {
          const newUser = new Consumer({
            username:profile.displayName,
            firstname:profile.name.givenName,
            lastname:profile.name.familyName,
            email:profile.emails[0].value,
            phone:Math.floor(Math.random()*100000),
            googleId: profile.id
          });
          return newUser.save();
        }
      }).then((user) => {
        return cb(null, user);
      }).catch((err) => {
        return cb(err);
      });
  }
));

//city api integration code
var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "WExOZ3ZyQ1VPNHlqMkNOeDFDUGhuN3Z2QmVUbDFFREMxZHNtMmRIWg==");
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
        };

        

register.route('/consumer')
.get((req, res)=>{
    fetch("https://api.countrystatecity.in/v1/countries/IN/states/MH/cities", requestOptions)
    .then(response => response.json())
    .then(result =>{
       res.render('register_consumer',{cities:result});
    })
    .catch(error => console.log('error', error));
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
            //redirect to customer dashboard
        }
    })
});
register.route("/consumer/auth/google") 
.get(
    passport.authenticate("google", { scope: ['email','profile']})
   
)

register.route("/consumer/auth/google/agrigo") 
.get(
  passport.authenticate('google', { failureRedirect: '/register' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.render("consumer_dashboard.ejs");
});
// register.route("/consumer")
// register.get("/consumer",(req,res) =>{
//     if(req.isAuthenticated()){
//         res.render("consumer_dashboard.ejs");

//     }
//     else{
//         res.redirect("/register");
//     }
// })
// register.get("/logout", (req,res) =>{
//     req.logout(function(err) {
//         if (err) { return next(err); }}
//         )
//     res.redirect("/");
// })
module.exports = register;












































// register.route('/farmer')
// .get((req, res)=>{
//     fetch("https://api.countrystatecity.in/v1/countries/IN/states/MH/cities", requestOptions)
//     .then(response => response.json())
//     .then(result =>{
//        res.render('register_farmer',{cities:result})
//     })
//     .catch(error => console.log('error', error));
// })
// .post((req, res)=>{
//     let username = req.body.username;
//     let email = req.body.email;
//     let phone = req.body.phone;
//     Farmer.find()
//     .then((Farmers)=>{
//         const check = 1;
//         if (Farmers){
//             Farmers.forEach(F=>{
//                 if (F.username === username){
//                     res.send("username already exists");
//                     check = 0;
//                 }
//                 else if (F.email === email){
//                     res.send("email already exists");
//                     check = 0;
//                 }
//                 else if (F.phone === phone){
//                     res.send("phone no. already exists");
//                     check = 0;
//                 }
//             })
//             if (check === 1){
//                 const newFarmer=new Farmer({
//                     username: req.body.username,
//                     firstname: req.body.firstname,
//                     lastname: req.body.lastname,
//                     email: email,
//                     password: req.body.password,
//                     phone: phone,
//                     city: req.body.city,
//                     state: req.body.state
//                 });
                
//                 newFarmer.save();
//                 res.send("Registered successfully");
//             }
//         } else {
//             const newFarmer=new Farmer({
//                 username: username,
//                 firstname: req.body.firstname,
//                 lastname: req.body.lastname,
//                 email: email,
//                 password: req.body.password,
//                 phone: phone,
//                 city: req.body.city,
//                 state: req.body.state
//             });
//             newFarmer.save();
//             res.send("Registered successfully");
//         }
//     })
// });        
