const express = require('express');
const login = express();

login.route('/')
.get((req, res)=>{
    res.render('login');
})
.post("/login", (req, res)=>{
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function(err){
        if(err){
            console.log(err);
        }
        else{
            passport.authenticate("local")(req, res, ()=>{
                res.redirect("/secrets");
            });
        }
    })
});

module.exports = login;