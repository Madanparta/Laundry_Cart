const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, unique:true },
    district: { type: String, required: true },
    pincode: { type: Number, required: true },
    email: { type: String, unique:true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true }
},{timestamps:true});

const User = mongoose.model("Users",registerSchema);

module.exports = User;