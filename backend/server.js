const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000


mongoose.set('strictQuery', false);

dataBase() //connect to database..

const app = require('./app');
dotenv.config();


app.listen(PORT,()=>console.log(`Server start with ${PORT} Number.`))


