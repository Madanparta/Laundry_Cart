require('dotenv').config();
const mongoose = require("mongoose");

const dataBase = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Data base connected with ${conn.connection.host}`)
    }catch(error){
        console.error(error);
    }
}

module.exports = dataBase;