
export const genrateToken =(user,message,statusCode,res)=>{      // UserController se jo user create hoa (user,message,statusCode,res) is 3 properties ke sath to us ka token genrate karoo
         
    const token = user.generateJsonWebToken()
    const cookieName = user.role === "Admin" ? "AdminToken" : "patientToken" // token create karni se pahly ye cheack karoo ke role kon sa he Agr Admin he (?) to AdminToken create karoo ():) warna patientToen
    res.status(statusCode).cookie(cookieName,token, {
        expires : new Date(Date.now() + process.env.COOKIE_EXPIRE *24 * 60 * 60 * 1000 ),
        httpOnly:true,
    }).json({
        success:true,
        message,
        user,
        token,
    })
    
}