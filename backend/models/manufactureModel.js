import mongoose from "mongoose";

const manufactureSchema = await mongoose.Schema({
    "name": { type: String, required: true },
    "description": { type: String, required: true },
    "image": { type: String, },
    "date": { type: Number, required: true },
})

const manufactureModel = mongoose.model.manufacture || mongoose.model("manufacture", manufactureSchema)
export default manufactureModel