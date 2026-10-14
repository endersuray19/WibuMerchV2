import express from "express"
import { addCharacter, editCharacter, getCharacter, listCharacter, removeCharacter } from "../controllers/characterController.js"
import multer from "multer"
import upload from "../middleware/multer.js"
import adminAuth from "../middleware/adminAuth.js"

const characterRoute = express.Router()

characterRoute.get("/index", adminAuth, listCharacter)
characterRoute.post("/add", adminAuth, upload.single('image'), addCharacter)
characterRoute.post("/edit", adminAuth, upload.single('image'), editCharacter)
characterRoute.post("/remove", adminAuth, removeCharacter)
characterRoute.get("/detail-character", adminAuth, getCharacter)


export default characterRoute