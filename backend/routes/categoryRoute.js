import express from "express"
import { addCategory, editCategory, getCategory, listCategory, removeCategory } from "../controllers/categoryController.js"
import multer from "multer"
import upload from "../middleware/multer.js"
import adminAuth from "../middleware/adminAuth.js"

const categoryRoute = express.Router()

categoryRoute.get("/index", listCategory)
categoryRoute.post("/add", upload.single('image'), addCategory)
categoryRoute.post("/edit", upload.single('image'), editCategory)
categoryRoute.post("/remove", removeCategory)
categoryRoute.get("/detail-category", getCategory)


export default categoryRoute