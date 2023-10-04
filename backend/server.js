const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;
const app = require('./app');
const DataBase = require("./dataBase/DataBase");
// const API = process.env.MONGO_URL;

DataBase() //data base connecting..

app.listen(port,()=>console.log(`Live Server as been connected ${port}`))

// async function main() {
//     await mongoose.connect(API);
//     console.log('connected to database');
//     app.listen(port, () => console.log(`Server is live at PORT => ${port}`));
// };
// main();
