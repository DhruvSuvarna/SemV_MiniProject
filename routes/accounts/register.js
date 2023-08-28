const express = require('express');
const register = express();

register.route('/farmer')
.get((req, res)=>{
    res.render('register_farmer');
})
.post('/register', (req, res)=>{
    User.register({username: req.body.username}, req.body.password)
    .then((user)=>{
        passport.authenticate("local")(req, res, ()=>{
            res.redirect("/secrets");
        });
    })
    .catch((err)=>{
        console.log(err); res.redirect("/register");
    });
});        

module.exports = register;