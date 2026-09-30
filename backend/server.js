import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'

const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json)
app.use(cors())

//config
connectDB()

//api endpoint
app.get('/',(req,res)=>{
    res.send('API Success')
})

app.listen(port,()=>console.log('Server started on PORT : ' + port))