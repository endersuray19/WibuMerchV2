import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:Array},
    cartData:{type:Object,default:{}},
},{minimize:false})
const userSchema = mongoose.model.user || mongoose.model("user",userModel)
export default userSchema