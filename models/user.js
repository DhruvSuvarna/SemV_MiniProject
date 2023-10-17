const mongoose = require('mongoose');
const passportLocalMongoose=require("passport-local-mongoose");
//User Schemas
// const farmerSchema = new mongoose.Schema({
//     username: { type: String, unique: true, required: false },
//     firstname: { type: String, required: false },
//     lastname: { type: String, required: false },
//     email: { type: String, required: false },
//     password: { type: String, required: false },
//     phone: { type: String, unique: true, required: false },
//     state: { type: String, required: false },
//     city: { type: String, required: false },
//     googleId:String
// },{timestamps:true});

const consumerSchema = new mongoose.Schema({
  username: { type: String, unique: false, required: false },
  firstname:String,
  lastname:String,
  email: { type: String, required: false },
  password: { type: String, required: false },
  phone: { type: String},
  city:String,
  state:String,
  role:String,
  googleId:String
},{timestamps:true})

consumerSchema.plugin(passportLocalMongoose);
//User Models

const Consumer=new mongoose.model("Consumer",consumerSchema);

module.exports = { Consumer };