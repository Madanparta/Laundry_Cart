const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;
const app = require('./app');
const DataBase = require("./dataBase/DataBase");

DataBase() //data base connecting..

app.listen(port,()=>console.log(`Live Server as been connected ${port}`))
