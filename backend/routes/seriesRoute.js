import express from"express"
import adminAuth from "../middleware/adminAuth.js"
import { addSeries, editSeries, getSeries, listSeries, removeSeries } from "../controllers/seriesController.js"
import upload from "../middleware/multer.js"
const seriesRoute = await express.Router()

seriesRoute.get('/index',adminAuth,listSeries)
seriesRoute.post('/add',adminAuth,upload.single('image'),addSeries)
seriesRoute.post('/edit',adminAuth,upload.single('image'),editSeries)
seriesRoute.post('/remove',adminAuth,removeSeries)
seriesRoute.get('/detail-series',adminAuth,getSeries)

export default seriesRoute