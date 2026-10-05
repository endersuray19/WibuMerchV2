import { Router } from "express";
import express from "express"
import { addProduct, editProduct, getProduct, listProduct, removeProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const routeProduct = express.Router()

routeProduct.get("/index",adminAuth,listProduct)
routeProduct.post("/add",adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
routeProduct.post("/edit",adminAuth,editProduct)
routeProduct.post("/remove",adminAuth,removeProduct)
routeProduct.get("/detail-product",adminAuth,getProduct)

export default routeProduct