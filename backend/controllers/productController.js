import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

const getProduct = async (req, res) => {
   try{
     const {productId} = req.body

    const product = await productModel.findById(productId)
    res.json({success:true,product})
   }
   catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    }
    catch (error) {
        return res.json({success:false,message:"Failed to list data product : "+ error.message})
    }
}
const addProduct = async (req, res) => {
    try {
        const { name, description, price,stock, character, series, category, subCategory, manufacture, wishlist } = req.body

        const imageFiles = req.files || [];

        const imageUrl = await Promise.all(
            imageFiles.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )
        const productData = {
            name,
            description,
            price: Number(price),
            stock: Number(price),
            character,
            series,
            category,
            subCategory,
            manufacture,
            wishlist: wishlist === "true" ? true : false,
            image: imageUrl,
            date: Date.now()

        }
        console.log(productData)

        const product = new productModel(productData)
        await product.save()

        res.json({ success: true, message: "Product added successfully!" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.messsage })
    }
}
const editProduct = async (req, res) => {

}
const removeProduct = async (req, res) => {
    try{
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product remove successfully!" })
    }catch(error){
        res.json({ success: false, message: error.messsage })
    }
}

export { getProduct, listProduct, addProduct, editProduct, removeProduct }