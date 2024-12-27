// DASHBOARD ADMIN ATHANTICATION AND AUTHORAIETION
import  {catchAsyncErrors}  from "./CatchAsynicError.js";
import ErrorHandler from "./errorMiddlewere.js";
import jwt from "jsonwebtoken"
import {User} from "../modals/userSchema.js"



export const isAdminAthantication = catchAsyncErrors(
    async (req, res, next) => {
      const token = req.cookies.AdminToken;
      if (!token) {
        return next(
          new ErrorHandler("Dashboard User is not authenticated!", 400)
        );
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id);
      if (req.user.role !== "Admin") {
        return next(
          new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
        );
      }
      next();
    }
  );
 


export const isPateintAthantication = catchAsyncErrors(async(req, res, next)=>{
    const token = req.cookies.patientToken
    if(!token){
        return next(new ErrorHandler("Patient Not Athanticated",400))
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if(req.user.role !== "Patient"){
        return next(new ErrorHandler(`${req.user.role}not Authorized for this resourse`,400))
    }
    next()
})