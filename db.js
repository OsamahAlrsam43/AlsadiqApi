
const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()


const db = async (namedata)=>{
    try {
        
     await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DBIP}/${namedata}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`, { useNewUrlParser: true,useUnifiedTopology: true });
   console.log('db connected');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    
};

module.exports = db;