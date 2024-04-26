const router = require('express').Router();
const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require('bcryptjs');
const secret = process.env.SECRET_KEY;



router.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body; //username is phone or email

            //check user exists or not?
            const isUser = isNaN(Number(username))
                ? await User.findOne({ email: username })
                : await User.findOne({ phone: username });
            if (!isUser) {
                return res.status(400).send("No User Exists With given Email / Phone Number")
            } else {
                const comparePassword = bcrypt.compareSync(password,isUser.password);
                if(!comparePassword){
                    return res.status(401).json({
                        "Message": err.message
                    })
                }
                const token = jwt.sign({
                    id:isUser._id
                },secret,{expiresIn:'1d'})
                res.status(200).json({
                    "Message": `Logged In SuccessFully Welcome ${isUser.name}`,
                    "Name": isUser.name,
                    "Address": isUser.address,
                    "Token": token
                })
            }
        } catch (e) {
            return res.status(400).json({
                "Message": e.message
            })
        }
    })

router.put('/forgotpassword', async (req,res)=>{
    try{
        const {username , password} = req.body;
        const isUser = isNaN(Number(username))
        ? await User.findOne({ email: username })
        : await User.findOne({ phone: username });

        if(!isUser){
            return res.status(400).send("No User Exists With given Email / Phone Number")
        }else{
            bcrypt.hash(password, 10, async function (err, hash) {
                const map = {password:hash}
                if (err) {
                    return res.status(400).json({
                        "Error": err.message
                    })
                } else {
                    const updateData = await User.findByIdAndUpdate(isUser._id,map,
                        {
                        new: true,
                        useFindAndModity: false
                      })
                      res.status(200).json({
                        message: "Password Updated",
                        "User": updateData
                      })
                  


                }
            })


        }


    }catch(e){
        res.status(400).send(e.message)
    }
} )

module.exports = router;