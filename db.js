const mongoose = require("mongoose");

 const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected");
    }
    catch(err){
        console.log("mongodb is not connected");
    }
 }

 export default connectDB;