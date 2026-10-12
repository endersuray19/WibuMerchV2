import { v2 as cloudinary } from "cloudinary"
import manufactureModel from "../models/manufactureModel.js"

const listManufacture = async (req, res) => {
    try {
        const manufactures = await manufactureModel.find({})

        console.log(manufactures)
        res.json({ success: true, manufactures })
    } catch (error) {
        console.log(error)
        res.json({ success: true, message: error.message })
    }
}
const addManufacture = async (req, res) => {
    try {
        const { name, description} = req.body
        const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' })
        const imageUrl = imageUpload.secure_url
        const manufactureData = ({
            name: name,
            description: description,
            image:imageUrl,
            date:Date.now()
        })
        
        
        const manufacture = new manufactureModel(manufactureData)
        await manufacture.save()
        console.log(manufacture)
        res.json({ success: true, manufacture, message: "Manufacture added successfully!" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const editManufacture = async (req, res) => {
    try {
        const { id, name, description, image } = req.body

        const manufacture = await manufactureModel.findById(id)

        const dataUpdateManufacture = {
            name: name || manufacture.name,
            description: description || manufacture.description,
        }

        if(req.file){
         const uploadImage = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' })
        dataUpdateManufacture.image = uploadImage.secure_url

        }
        await manufactureModel.findByIdAndUpdate(id, dataUpdateManufacture)

        console.log(dataUpdateManufacture)
        res.json({ success: true, dataUpdateManufacture, message: "Manufacture updated successfully!" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const removeManufacture = async (req, res) => {
    try {
        await manufactureModel.findByIdAndDelete(req.body.id)

        res.json({ success: true, message: "Manufacture remove successfully!" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const getManufacture = async (req, res) => {
    try {
        const { id } = req.body
        const manufacture = await manufactureModel.findById(id)
        console.log(manufacture)
        res.json({ success: true, manufacture })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listManufacture, addManufacture, editManufacture, removeManufacture, getManufacture }