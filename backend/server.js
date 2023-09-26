const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
const dataBase = require("./Database/dbServer");

dataBase() //connect to database..

app.listen(PORT,()=>console.log(`Server start with ${PORT} Number.`))

app.get("/",(req,res)=>{
    res.send("Hello Page..!");
})

const logger = (req,res,next)=>{
    console.log(`Request recived at ${new Date()} on path ${req.url}`);
    next();
}

app.use(logger);
app.use(express.json());
app.use('*', (req,res)=>{
    res.status(404).json({error:"404 not found"})
})