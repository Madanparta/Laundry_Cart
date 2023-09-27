const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    district:{type:String,required:true},
    state:{type:String,required:true},
    address:{type:String,required:true},
    pincode:{type:Number,required:true},
    password:{type:String,required:true},
},{timestamps:true});

const User = mongoose.model("User",registerSchema);

module.exports = User;