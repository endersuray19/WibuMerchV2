import express from "express"
import { addManufacture, removeManufacture, editManufacture, getManufacture, listManufacture } from "../controllers/manufactureController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const manufactureRoute = express.Router();

manufactureRoute.get("/index",adminAuth,listManufacture)
manufactureRoute.post("/add",adminAuth,upload.single('image'),addManufacture)
manufactureRoute.post("/edit",adminAuth,upload.single('image'),editManufacture)
manufactureRoute.post("/remove",adminAuth,removeManufacture)
manufactureRoute.get("/detail-manufacture",adminAuth,getManufacture)

export default manufactureRoute