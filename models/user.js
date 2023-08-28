//User Schema
const farmerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    firstname: String,
    lastname: String,
    email: String,
    phone: Number,
    state: String,
    city: String,
    password: String,
    googleId: String,
});

//passport plugin
farmerSchema.plugin(passportLocalMongoose);
farmerSchema.plugin(findOrCreate);

const Farmer = new mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;