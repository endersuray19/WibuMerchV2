import{v2 as cloudinary }  from "cloudinary"

const connectCloudinary = async()=>{
   cloudinary.config({
    api_key : process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
    cloud_name : process.env.CLOUDINARY_NAME
   })
}
export default connectCloudinary