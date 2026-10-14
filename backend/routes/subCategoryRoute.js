import express from"express"
import adminAuth from"../middleware/adminAuth.js"
import upload from"../middleware/multer.js"
import { addSubCategory, editSubCategory, getSubCategory, listSubCategory, removeSubCategory } from "../controllers/subCategoryController.js"

const subCategoryRoute = express.Router()
    subCategoryRoute.get("/index",adminAuth,listSubCategory)
    subCategoryRoute.post("/add",adminAuth,upload.single('image'),addSubCategory)
    subCategoryRoute.post("/edit",adminAuth,upload.single('image'),editSubCategory)
    subCategoryRoute.post("/remove",adminAuth,removeSubCategory)
    subCategoryRoute.get("/detail-subcategory",adminAuth,getSubCategory)
export default subCategoryRoute