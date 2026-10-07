import express from "express"
import { addCategory, getCategory, listCategory, removeCategory } from "../controllers/categoryController.js"
import multer from "multer"
import upload from "../middleware/multer.js"
import adminAuth from "../middleware/adminAuth.js"

const categoryRoute = express.Router()

categoryRoute.get("/index",adminAuth,listCategory)
categoryRoute.post("/add",adminAuth,upload.single('image'),addCategory)
categoryRoute.post("/remove",adminAuth,removeCategory)
categoryRoute.get("/detail-category",adminAuth,getCategory)


export default categoryRoute