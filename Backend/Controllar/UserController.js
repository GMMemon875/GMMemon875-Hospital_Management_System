import {catchAsyncErrors} from "../middlewere/CatchAsynicError.js"
import ErrorHandler from "../middlewere/errorMiddlewere.js"
import { User } from "../modals/userSchema.js"
import {genrateToken} from "../utils/jwtToken.js"


export const patientRegister = catchAsyncErrors(async(req,res,next) =>{

    const {firstName,lastName,email,phone,nic,dob,gender,role,password} = req.body
    if (!firstName|| !lastName|| !email|| !phone|| !nic|| !dob|| !gender|| !role|| !password){
        return next(new ErrorHandler("please fill full form",400))
    }

    let user = await User.findOne({email});
    if(user){
        return await next(new ErrorHandler("User Already Register"))
    }
    user = await User.create({firstName,lastName,email,phone,nic,dob,gender,role,password});
    genrateToken(user,"user Register successfully",200,res)
})


export const Login = catchAsyncErrors(async(req,res,next) => {
    const {email, password,confirmPassword,role}= req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("please provide all datails" ,400))
    }
    if(password !== confirmPassword ){
        return next(new ErrorHandler("Password and confirmPassword is not match",400))
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Email or Password Incorrect" ,400))
    }
    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch){
        return next(new ErrorHandler("Password and Email is not Match" ,400))

    }
    if(role !== user.role){
        return next(new ErrorHandler("User with this role is not Found"))
    }
    genrateToken(user,"user Login successfully",200,res)
})


export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
  
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`, 400));
    }
  
    const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Admin",
    });
    res.status(200).json({
      success: true,
      message: "New Admin Registered",
      admin,
    });
  });

 