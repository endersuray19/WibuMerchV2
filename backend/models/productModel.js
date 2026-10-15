import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: Array, default: [] },
    series: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'series',
        required: true
    },
    character: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "character",
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory',
        required: true
    },
    manufacture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "manufacture",
        required: true
    },
    wishlist: { type: Boolean },
    date: { type: Number, required: true },

})

const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel
