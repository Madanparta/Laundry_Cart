const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;
const DataBase = require("./dataBase/DataBase");

DataBase() //data base connecting..


const app = require('./app');
dotenv.config();

app.listen(port,()=>console.log(`Live Server as been connected ${port}`))
