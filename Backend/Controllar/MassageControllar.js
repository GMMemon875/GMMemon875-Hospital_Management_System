import { Message } from "../modals/massageSchema.js"
import {catchAsyncErrors} from "../middlewere/CatchAsynicError.js"

 export const Sendmassage = catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,message}= req.body
    if (!firstName || !lastName || !email || !phone || !message) {
        return res.status(400).json({
            success: false,
            massage:"please fill full form"
        })
    }
    await Message.create({firstName,lastName,email,phone,message})
     res.status(400).json({
        success: true,
        massage:"form create successfully"
    })
 })