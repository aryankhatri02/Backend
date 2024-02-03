
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
const generateTokenAndSetCookie=(userId,res)=>{

const token=jwt.sign(({userId}),process.env.JWT_SECRET,{
    expiresIn:'15d',

})
res.cookie("token",token,{
    httpOnly:true,
    maxAge:15*24*60*1000,
    sameSite:"strict",//csrf

})
return token;

}
export default generateTokenAndSetCookie;