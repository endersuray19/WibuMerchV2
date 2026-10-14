import subCategoryModel from "../models/subCategoryModel.js"
import { v2 as cloudinary } from "cloudinary"

const listSubCategory = async (req, res) => {
    try {
        const subCategories = await subCategoryModel.find({})
        console.log(subCategories)
        res.json({ success: true, subCategories })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const addSubCategory = async (req, res) => {
    try {
        const { name, description, category } = req.body

        const uploadImage = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' })
        const imageUrl = uploadImage.secure_url
        const subCategoryData = {
            name: name,
            description: description,
            category: category,
            image: imageUrl,
            date: Date.now()
        }

        const subCategory = new subCategoryModel(subCategoryData)
        await subCategory.save()
        console.log(subCategory)

        res.json({ success: true, subCategory, message: 'SubCategory added successfully' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const editSubCategory = async (req, res) => {
    try {
        const { id, name, description, image, category } = req.body

        const subCategoryId = await subCategoryModel.findById(id)
        const subCategoryData = {
            name: name || subCategoryId.name,
            description: description || subCategoryId.description,
            category: category || subCategoryId.category
        }
        if (req.file) {
            const uploadImage = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' })
            subCategoryData.image = uploadImage.secure_url
        }
        await subCategoryModel.findByIdAndUpdate(subCategoryId, subCategoryData)

        res.json({ success: true, message: 'SubCategory Updated successfully' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const removeSubCategory = async (req, res) => {
    try {
        await subCategoryModel.findByIdAndDelete(req.body.id)
        console.log()
        res.json({ success: true, message: 'SubCategory removed successfully' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const getSubCategory = async (req, res) => {
    try {
        const { id } = req.body
        const subCategory = await subCategoryModel.findById(id)
        console.log(subCategory)
        res.json({ success: true, subCategory })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export { listSubCategory, addSubCategory, editSubCategory, removeSubCategory, getSubCategory }