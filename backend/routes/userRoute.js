import express from "express"
import { adminLogin, loginUser, registerUser } from "../controllers/userController.js"

const userRoute = express.Router()

userRoute.post('/register',registerUser)
userRoute.post('/login',loginUser)
userRoute.get('/admin',adminLogin)

export default userRoute;
