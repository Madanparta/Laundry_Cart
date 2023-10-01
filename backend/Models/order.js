const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    product_type:{type:String,required:true},
    wash_type:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
})

const productOrderSchema = mongoose.Schema({
    user:{type:mongoose.type.ObjectId,ref:"users"},
    orders:[orderSchema],
    total_price : {type:Number,required:true},
    status:{type:String,required:true}
},{timestamps:true});

const Orders = mongoose.model("Orders",productOrderSchema);

module.exports = Orders