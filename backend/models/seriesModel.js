import mongoose from "mongoose"

const seriesSchema = await mongoose.Schema({
    'name': { type: String, required: true },
    'description': { type: String, required: true },
    'image': { type: String },
    'date': { type: Number, required: true }
})
const seriesModel = mongoose.model.series || mongoose.model("series", seriesSchema)
export default seriesModel