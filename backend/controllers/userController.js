import validator from "validator"
import bycript from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import { json } from "express"

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}
const loginUser = async(req,res)=>{
    
}
const registerUser = async(req,res)=>{
    try{
        const {name, email, password}=req.body
    
        const exits = await userModel.findOne({email})
        

        if(exits){
            return json.send({success:false,message:"User already exit!"})
        
        }
        if(!validator.isEmail(email)){
            return json.send({success:false,message:"Please enter valid email!"})
        }
        if(password.length<8){
            return json.send({success:false,message:"Password must be least contain 8 letter!"})
        }
        
        const salt = await bycript.genSalt(10)
        const hashPassword = await bycript.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            hashPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({success:true,token})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const adminLogin = async(req,res)=>{

}
export {loginUser,registerUser,adminLogin}