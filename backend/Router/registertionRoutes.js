const router = require("express").Router();
const User = require("../Models/userSchema");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
router.use(bodyParser.json());
require('dotenv').config();

router.post("/register",body("email").isEmail(),body("password").isLength({ min: 5, max: 16 }), async (req, res) => {
    try {

      const { name,email,password,phone,district,pincode,state,address} = req.body;

      // console.log(name,email,password,phone,district,pincode,state,address)
      // console.log(req.body);

      const isUser = await User.findOne({ email: email }); //checking if user alredy exist with given mail id
      // const isUserr = await User.findOne({ phone: phone });
      
      if (isUser) {
        return res
          .status(403)
          .send("User Already Exists With Given Email or PhoneNo.");
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            error: errors.array(),
          });
        } else {
          const hashing = bcrypt.hashSync(password,10);
          const user = new User({
            name: name,
            email: email,
            password: hashing,
            phone: phone,
            district: district,
            pincode: pincode,
            state: state,
            address: address,
          });
          user.save().then(() => {
            return res.status(200).json({
              user: user,
            });
          });
        }
      }
    } catch (e) {
      return res.status(400).json({
        Message: e.message,
      });
    }
  }
);

module.exports = router;
