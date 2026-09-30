import mongoose from "mongoose";

const connectDB = ()=>{
    mongoose.connection.on("connected",()=>{
        console.log("DB Conected")
    })
    mongoose.connect(`${process.env.MONGODB_URL}`)
}
export default connectDB