const express = require('express');
const jwt = require("jsonwebtoken");
const contactRouter = express.Router()
const Orders = require("../Models/order");
const Product = require("../Models/product");


const verfiyFwt = (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        next();
    }
    const decodeing = jwt.verify(token,process.env.SECRET_KEY);
    req.user = decodeing;
    return next();
}
contactRouter.use(verfiyFwt);

contactRouter.post("/createorder",async (req,res)=>{
    // console.log(req.user)
    try{
        await Orders.create({user:req.user,...req.body});
        res.status(201).json({
            status:"success",
            message:"Data added"
        })

    }catch(err){
        res.status(406).json({
            status:"Failed",
            message:err.message
        })
    }
})

contactRouter.get("/product",async(req,res)=>{
    try{
        const data = await Product.find().sort({_id:-1});
        res.json(data)

    }catch(err){
        res.status(406).json({
            status:"Failed",
            message:err.message
        })
    }
})

contactRouter.get('/prevorder',async (req,res)=>{
    try{
        const order = await Orders.find({user:req.user});
        res.status(200).json({
            status:"success",
            Orders:order
        })
    }catch(err){
        res.status(400).send("Failed");
    }
})

contactRouter.put("/updateorder/:id",async (req,res)=>{
    try{
        await Orders.findByIdAndUpdate({_id : req.params.id}, { $set:{'status': "Cancelled"}})
        res.status(200).send("Updated")
    }catch(err){
        res.status(401).send(err.message)
    }
})

module.exports = contactRouter;