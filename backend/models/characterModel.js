import mongoose from "mongoose"

const characterSchema = await mongoose.Schema({
    'name': { type: String, required: true },
    'description': { type: String, required: true },
    'series':{type:mongoose.Schema.Types.ObjectId,ref:'series',required:true},
    'image': { type: String },
    'date': { type: Number, required: true }
})
const characterModel = mongoose.model.character || mongoose.model("character", characterSchema)
export default characterModel