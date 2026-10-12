import express from "express"
import { addManufacture, removeManufacture, editManufacture, getManufacture, listManufacture } from "../controllers/manufactureController.js";
import upload from "../middleware/multer.js";

const manufactureRoute = express.Router();

manufactureRoute.get("/index",listManufacture)
manufactureRoute.post("/add",upload.single('image'),addManufacture)
manufactureRoute.post("/edit",upload.single('image'),editManufacture)
manufactureRoute.post("/remove",removeManufacture)
manufactureRoute.get("/detail-manufacture",getManufacture)

export default manufactureRoute