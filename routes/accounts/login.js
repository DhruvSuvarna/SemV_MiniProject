const express = require('express');
const session=require("express-session");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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
    // console.log(username_email+password);
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
                if(Consumer.username === username_email){
                    if(Consumer.password === password){
                        res.send("Login successful");
                        //redirect to customer dashboard
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

// login.use(session({
//     secret:"Our secret.",
//     resave:false,
//     saveUninitialized:false
// }));
// login.use(passport.initialize());
// login.use(passport.session());

// passport.use(Consumer.createStrategy());
// passport.use(Farmer.createStrategy());

// passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
   
//   passport.deserializeUser(function(user, done) {
//     done(null, user);
//   });

// passport.use(new GoogleStrategy({
//     clientID: "151280330340-k23r6i261c06c0t94pbetusb1jk2ug01.apps.googleusercontent.com",
//     clientSecret: "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",
//     callbackURL: "http://localhost:9001/accounts/login/consumer/auth/google/agrigo"
  
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     console.log(profile);
//     Consumer.findOne({ googleId: profile.id }).then((foundUser) => {
//         if (foundUser) {
//           return foundUser;
//         } else {
//           res.send("User Not Found");
//         }
//       }).then((user) => {
//         return cb(null, user);
//       }).catch((err) => {
//         return cb(err);
//       });
//   }
// ));
// login.route("/consumer/auth/google") 
// .get(
//     passport.authenticate("google", { scope: ['email','profile']})
   
// )

// login.route("/consumer/auth/google/agrigo") 
// .get(
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.render("consumer_dashboard.ejs");
// });

module.exports = login;