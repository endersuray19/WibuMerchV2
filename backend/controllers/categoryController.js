import categoryModel from "../models/categoryModel.js"
import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js";

const listCategory = async(req,res)=>{
    try{
        const categories = await categoryModel.find({});
        res.json({success:true,categories,message:"ini list nya sukses masuk"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const addCategory = async(req,res)=>{
  try{
    const {name,description,image} = req.body
    const imageUpload = await cloudinary.uploader.upload(req.file.path,{resource_type:'image'})
    const imageUrl = imageUpload.secure_url
    const category = {
        name,
        description,
        image:imageUrl,
        date:Date.now()
    }
     const categoryData = new categoryModel(category)
     await categoryData.save()
        console.log(categoryData)
       res.json({success:true,message:"Category added successfullt"})
  }
  catch(error)
  {
        console.log(error)
        res.json({success:false,message:error.message})
    }
   
  }

const editCategory = async(req,res)=>{
    try{
 const {id,name,description,image} = req.body

    const category = await categoryModel.findById(id)
    const categoryDataUpdate = {
        name: name || category.name,
        description: description || category.description
    }
    if(req.file){
        const imageUpload = await cloudinary.uploader.upload(req.file.path,{resource_type:'image'})
        categoryDataUpdate.image = imageUpload.secure_url
    }
     res.json({success:true,message:"Category updated successfullt"})
    await categoryModel.findByIdAndUpdate(id,categoryDataUpdate)
    }catch(error)
  {
        console.log(error)
        res.json({success:false,message:error.message})
    }
   

    
}
const removeCategory = async(req,res)=>{
    try{
        await categoryModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Category remove successfullt"})
    }
     catch(error)
  {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const getCategory = async(req,res)=>{
    try{
    const {idCategory} = req.body

    const category = await categoryModel.findById(idCategory)
    res.json({success:true,category})
    }catch(error)
  {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {listCategory,addCategory,editCategory,removeCategory,getCategory}