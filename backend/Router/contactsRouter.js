const express = require('express');
const jwt = require("jsonwebtoken");
const contactRouter = express.Router()


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

contactRouter.get("/contacts_details",(req,res)=>{
    console.log(req.user)
    res.send("contact page..")
})

module.exports = contactRouter;