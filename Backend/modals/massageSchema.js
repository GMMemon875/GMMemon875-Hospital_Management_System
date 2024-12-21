import mongoose from "mongoose";
import validator from "validator"

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        maxLength:[3,"first must contain 3 digits!"]
    },
    lastName:{
        type:String,
        require:true,
        maxLength:[3,"first must contain 3 digits!"]
    },

    email:{
        type:String,
        require:true,
        validate: [validator.isEmail, "Provide A Valid Email!"],
    },
    
    phone:{
        type:String,
        require:true,
        maxLength:[11,"phone number must contain 11 digits!"],
        minLength:[11,"phone number must contain 11 digits!"]

    },
    message:{
        type:String,
        require:true,
        mixLength:[10,"message must contain 10 charectore!"],
    },


})

export const Message = mongoose.model('Message',messageSchema)