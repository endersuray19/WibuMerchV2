import { Router } from "express";
import express from "express"
import { addProduct, editProduct, getProduct, listProduct, removeProduct } from "../controllers/productController.js";
import upload from "../models/multer.js";

const routeProduct = express.Router()

routeProduct.get("/index",listProduct)
routeProduct.post("/add",upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
routeProduct.post("/edit",editProduct)
routeProduct.post("/remove",removeProduct)
routeProduct.get("/detail-product",getProduct)

export default routeProduct