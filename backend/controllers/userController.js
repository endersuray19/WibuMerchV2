import validator from "validator"
import bycript from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import { json } from "express"

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
const loginUser = async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    try {
        if (!user) {
            return res.json({ success: false, message: "User does'nt exit!" })
        }
        else {
            const isMatch = await bycript.compare(password, user.password)

            if (isMatch) {
                const token = createToken(user._id)
                return res.json({ success: true, token })
            } else {
                return res.json({ success: false, message: "Invalid password!" })
            }
        }
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const exits = await userModel.findOne({ email })


        if (exits) {
            return res.json({ success: false, message: "User already exit!" })

        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email!" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be least contain 8 letter!" })
        }

        const salt = await bycript.genSalt(10)
        const hashPassword = await bycript.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({ success: true, token })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const adminLogin = async (req, res) => {
    try {
        const { adminEmail, adminPassword } = req.body

        if (adminEmail === process.env.ADMIN_EMAIL && adminPassword === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(adminEmail + adminPassword, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: "Failed login" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export { loginUser, registerUser, adminLogin }