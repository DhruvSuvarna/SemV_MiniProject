const mongoose = require('mongoose');
//User Schemas
const farmerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true }
});

const consumerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName:String,
  lastName:String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: String,
  city:String,
  state:String,
})
//User Models
const Farmer = new mongoose.model('Farmer', farmerSchema);
const Consumer=new mongoose.model("Consumer",consumerSchema);

module.exports = { Farmer, Consumer };