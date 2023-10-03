const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const RegistrationRoute = require("./Router/registertionRoutes");
const LoginRoute = require('./Router/loginRoutes');
const orderRoutes = require("./Router/orderRoutes");
const Authentication = require("./middleware/autherization");
require('dotenv').config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/' ,RegistrationRoute)
app.use('/',LoginRoute)
app.use("/",Authentication,orderRoutes);

app.get('/',(req,res)=>{
    res.status(200).json({
        "Message":"Server is OK"
    })
})

module.exports = app;