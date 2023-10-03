const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    product_type:{type:String , required : true},
    quantity : {type:Number , required : true},
    wash_type : {type : String , required: true},
    price : {type : Number , required : true},
	})

const ordersSchema = new mongoose.Schema({
    user:{type: mongoose.Types.ObjectId,ref:"users"},
    orders: [orderSchema],
    total_price : {type : Number , required : true},
	status : {type : String , required : true},
},{timestamps : true});

const OrderModel = mongoose.model("orders",ordersSchema);


module.exports = OrderModel;