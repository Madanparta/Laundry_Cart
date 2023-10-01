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

        const findingUser = await User.findOne({email});
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
registerRouter.post("/", async (req,res)=>{
    try{

        const { email, password } = req.body;

        const isUser = isNaN(Number(email)) ? await User.findOne({ email: email }): await User.findOne({ phone: email });
        // console.log(isUser);

        if (!isUser) {
            return res.status(400).send("No User Exists With given Email / Phone Number")
        }else{
            const result = await bcrypt.compare(password, isUser.password)
                // Store hash in your password DB.
                // console.log(result)
            if(result){
                const token = jwt.sign({
                    user: isUser.email
                  }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
                //   console.log(token)
                res.status(200).json({
                    "Message": `Logged In SuccessFully Welcome ${isUser.name}`,
                    "Name": isUser.name,
                    "Address": isUser.address,
                    "Token": token
                })
            }else{
                return res.status(401).send("Invalid Credentials")
            }

        }
            
    }catch(error){
        res.status(400).json({
            "Message": error.message
        })
    }
});

// forgot password..

registerRouter.put('/forgotpassword',async (req,res)=>{
    try{
        const {email,password} = req.body;
        const isUser = isNaN(Number(email))? await User.findOne({email:email}):await User.findOne({phone:email});
        
        if(!isUser){
            return res.status(400).send("No User Exists With given Email / Phone Number");
        }else{
            // console.log(isUser)
            bcrypt.hash(password,10,async function(err,hash){

                const map = {password:hash}
                if(err){
                    return res.status(400).json({
                        "Error":err.message
                    })
                }else{
                    const updateDate = await User.findByIdAndUpdate(isUser._id,map,{
                        new:true,
                        userFindAndModity:false
                    })
                    res.status(200).json({
                        message: "Password Updated",
                        "User": updateDate
                    })
                }
            })
        }
    }catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = registerRouter;