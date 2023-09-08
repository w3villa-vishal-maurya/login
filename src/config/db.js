const mongoose = require("mongoose");

const connectDb = async() => {
    try {
        const connectUrl = "mongodb://127.0.0.1:27017/passport";
        await mongoose.connect(connectUrl);
        console.log("Connected to db..");
    }
    catch(e){
        console.log(e);
    }
}

module.exports = connectDb;
