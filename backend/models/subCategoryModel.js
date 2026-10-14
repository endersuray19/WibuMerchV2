import mongoose from "mongoose"

const subCategorySchema = await mongoose.Schema({
    'name': { type: String, required: true },
    'description': { type: String, required: true },
    'category':{type:mongoose.Schema.Types.ObjectId,ref:'category',required:true},
    'image': { type: String },
    'date': { type: Number, required: true }
})
const subCategoryModel = mongoose.model.subCategory || mongoose.model("subCategory", subCategorySchema)
export default subCategoryModel