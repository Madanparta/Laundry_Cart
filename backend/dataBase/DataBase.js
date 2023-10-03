require('dotenv').config();
const mongoose = require("mongoose");
const API = process.env.MONGO_URL;

const DataBase = async()=>{
    try{
        const conn = await mongoose.connect(API);
        console.log(`Data base connected with ${conn.connection.host}`)
    }catch(error){
        console.error(error);
    }
}

module.exports = DataBase