const router = require("express").Router();
const ordersModel = require("../Models/orderSchema");
const ProductModel = require("../Models/productSchema");


router.post("/createorder",async(req,res)=>{
    // console.log(req.user);

    try{
    await ordersModel.create({user:req.user, ...req.body});
        res.status(201).json({
            status : "success",
            message: "data added"
        });
    }
    catch(e){
        res.status(406).json({
            status:"Failed",
            message:e.message,
        })
    }
})

router.get("/product",async(req,res)=>{
    
    try{
        
        const data = await ProductModel.find().sort({_id:-1});
        res.json(data);
    }
    catch(e){
        res.status(406).json({
            status:"Failed",
            message:e.message,
        })
    }
});

router.get("/prevorder", async (req, res) => {
    // console.log(req)
    try {
        const orders = await ordersModel.find({user: req.user})
        res.status(200).json({
            status: "sucess",
            orders: orders
        })
    } catch (e) {
        res.status(400).send("Failed")
    }
});


router.put("/updateorder/:id", async (req, res) => {
    try{
        await ordersModel.findByIdAndUpdate({_id : req.params.id}, { $set:{'status': "Cancelled"}});
        res.status(200).send("Updated")
    } catch(e) {
        res.status(401).send(e.message)
    }
});

module.exports = router;