import app from "./app.js"
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_Name:process.env.CLOUDINARY_CLOUD_NAME,
    Api_key:process.env.CLOUDINARY_API_SECRET,
    Api_secret:process.env.CLOUDINARY_API_KEY,

})


app.listen(process.env.PORT,()=>{
    console.log(`server start on Port ${process.env.PORT}` )
})