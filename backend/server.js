import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRoute from './routes/userRoute.js'
import routeProduct from './routes/productRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import manufactureRoute from './routes/manufactureRoute.js'
import seriesRoute from './routes/seriesRoute.js'
import characterRoute from './routes/characterRoute.js'
import subCategoryRoute from './routes/subCategoryRoute.js'

const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

//config
connectDB()
connectCloudinary()

//api endpoint
app.use('/api/user',userRoute)
app.use('/api/product',routeProduct)
app.use('/api/category',categoryRoute)
app.use('/api/manufacture',manufactureRoute)
app.use('/api/series',seriesRoute)
app.use('/api/character',characterRoute)
app.use('/api/subcategory',subCategoryRoute)

app.get('/',(req,res)=>{
    res.send('API Success')
})

app.listen(port,()=>console.log('Server started on PORT : ' + port))