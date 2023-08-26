//connect to main db
mongoose.connect("mainDB");
const consumerSchema = new mongoose.Schema({
  firstName:String,
  lastName:String,
  email:String,
  password:String,
  phoneNo:String,
  city:String,
  state:String,
})

const consumer=new mongoose.model("Consumer",UserSchema);
module.export=consumer;