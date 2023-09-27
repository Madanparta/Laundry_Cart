const express = require("express");
const registerRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');
const User = require("../Models/register");


// creating user Registration..
registerRouter.post("/register",body('name').notEmpty(), body("email").isEmail() , body("password").isLength(min=6,max=16),body('phone').isMobilePhone(),body('address').notEmpty(),body('state').notEmpty(),body('district').notEmpty() ,async (req,res)=>{
    try{
        const {name,email,phone,district,state,address,pincode,password} = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ message: errors.array()});
        }

        const findingUser = await User.findOne({});
        if(findingUser){
            res.status(409).json({
                message:"User Already Existed.!"
            })
        }else{
            bcrypt.hash(password, 10,async function(err, hash) {
                // Store hash in your password DB.
                if(err){
                    res.status(401).json({
                        message:err.message
                    })
                }
    
                await User.create({name,email,phone,district,state,address,pincode,password:hash});
    
                res.status(200).json({
                    status:"Success",
                    message:"Successfully Register.."
                })
            });
        }


    }catch(error){
        res.status(400).json({
            status:"Failer",
            message:"Bad Request"
        })
    }
});



// creating user Login..
registerRouter.post("/login", async (req,res)=>{
    try{

        const {email,password} = req.body;
        // console.log(email,password);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ message: errors.array()});
        }

        // console.log(parseInt(email));
        let findingUser;
        if(parseInt(req.body.email)){
            let phoneNo = parseInt(req.body.email);
            findingUser = await User.findOne({phone:phoneNo});
        }else{
            findingUser = await User.findOne({email});
        }

        if(!findingUser){
            res.status(401).json({
                message:"Please input valid email/Phone or register"
            })
        
        }else{
            const result = await bcrypt.compare(password, findingUser.password)
                // Store hash in your password DB.
                // console.log(result)
            if(result){
                const token = jwt.sign({
                    user: findingUser.email
                  }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
                //   console.log(token)
                res.status(200).json({
                    status:"Success",
                    message:token
                })
            }else{
                res.status(401).json({
                    status:"Success",
                    message:"somthing wrong.."
                })
            }
        }
    }catch(error){
        res.status(400).json({
            status:"Failer",
            message:"Bad Request"
        })
    }
});



module.exports = registerRouter;