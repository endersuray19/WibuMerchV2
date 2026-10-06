import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    stock:{type:Number,required:true},
    image:{type:Array,default:[]},
    character:{type:String,required:true},
    series:{type:String,required:true},
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    manufacture:{type:String,required:true},
    wishlist:{type:Boolean},
    date:{type:Number,required:true},

})

const productModel = mongoose.model.product || mongoose.model("product",productSchema)

export default productModel
