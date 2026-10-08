import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    date: { type: Number, requred: true }
})

const categoryModel = mongoose.model.category || mongoose.model('category', categorySchema);
export default categoryModel