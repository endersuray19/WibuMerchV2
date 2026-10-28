import characterModel from "../models/characterModel.js"
import { v2 as cloudinary } from "cloudinary"

const listCharacter = async(req,res)=>{
     try {
            const character = await characterModel.find({});
            res.json({ success: true, character, message: "ini list nya sukses masuk" })
        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: error.message })
        }
}
const addCharacter = async(req,res)=>{
      try {
            const { name, description, series } = req.body
            const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url
            const character = {
                name,
                description,
                series:series,
                image: imageUrl,
                date: Date.now()
            }
            const characterData = new characterModel(character)
            await characterData.save()
            console.log(characterData)
            res.json({ success: true, message: "character added successfullt" })
        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: error.message })
        }
}
const editCharacter = async(req,res)=>{
     try {
        const { id, name, description, series } = req.body

        const character = await characterModel.findById(id)
        const characterDataUpdate = {
            name: name || character.name,
            description: description || character.description,
            series:series||character.series
        }
        if (req.file) {
            const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' })
            characterDataUpdate.image = imageUpload.secure_url
        }
        res.json({ success: true, message: "character updated successfullt" })
        await characterModel.findByIdAndUpdate(id, characterDataUpdate)
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}
const removeCharacter = async(req,res)=>{
      try {
        await characterModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "character remove successfullt" })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const getCharacter = async(req,res)=>{
     try {
        const { id } = req.body

        const character = await characterModel.findById(id)
        res.json({ success: true, character })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export {listCharacter,addCharacter,editCharacter,removeCharacter,getCharacter}