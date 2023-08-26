const express = require('express');
const account = express();
const register = require('./register');
const login = require('./login');

account.use('/register', register);
account.use('/login', login);


module.exports = account;