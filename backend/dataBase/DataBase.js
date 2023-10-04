require('dotenv').config();
const mongoose = require("mongoose");
const API = process.env.MONGO_URL;

const DataBase = async()=>{
    // try{
    //     const conn = await mongoose.connect(API);
    //     console.log(`Data base connected with ${conn.connection.host}`)
    // }catch(error){
    //     console.error(error);
    // }

    const mongoDBURL = API;

    mongoose.connect(mongoDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });


}

module.exports = DataBase




// const mongoose = require('mongoose');

// Replace 'your_database_url' with the actual MongoDB database URL
// const mongoDBURL = 'mongodb://localhost:27017/your_database_name';

// mongoose.connect(mongoDBURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });