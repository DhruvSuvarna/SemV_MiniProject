const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const ejs = require('ejs');
const port = 4000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
 
// Connect to MongoDB using Mongoose

app.get("/", (req, res)=>{
    res.render('index');
});

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});

/* Week1 Objectives(Dhruv and Shibhya)
1. Translation API (find)
2. Basic EJS Pages(HTML)
3. Backend linking
4. Integrating Translation API
*/

/* Week1 Objectives(Alfred and Joshua)
1. Making Basic UI
2. Learning Frontend
3. Implementing some Frontend
*/