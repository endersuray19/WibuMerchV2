import seriesModel from "../models/seriesModel.js"
import {v2 as cloudinary} from "cloudinary"

const listSeries = async (req, res) => {

    try {
        const series = await seriesModel.find({})
        res.json({ success: true, series })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const addSeries = async (req, res) => {
    try {
        const { name, description } = req.body
        const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' })
        const imageUrl = imageUpload.secure_url
        const seriesData = ({
            name: name,
            description: description,
            image: imageUrl,
            date: Date.now()
        })


        const series = new seriesModel(seriesData)
        await series.save()
        console.log(series)
        res.json({ success: true, series, message: "series added successfully!" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const editSeries = async (req, res) => {
    try {
        const { id, name, description, image } = req.body

        const series = await seriesModel.findById(id)

        const dataUpdateseries = {
            name: name || series.name,
            description: description || series.description,
        }

        if (req.file) {
            const uploadImage = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' })
            dataUpdateseries.image = uploadImage.secure_url

        }
        await seriesModel.findByIdAndUpdate(id, dataUpdateseries)

        console.log(dataUpdateseries)
        res.json({ success: true, dataUpdateseries, message: "series updated successfully!" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const removeSeries = async (req, res) => {
    try {
        await seriesModel.findByIdAndDelete(req.body.id)

        res.json({ success: true, message: "series remove successfully!" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const getSeries = async (req, res) => {
    try {
        const { id } = req.body
        const series = await seriesModel.findById(id)
        console.log(series)
        res.json({ success: true, series })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export { listSeries, addSeries, editSeries, removeSeries, getSeries }