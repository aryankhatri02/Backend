import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'; 
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';
//Sign up for User

const signupUser = async (req,res)=>{

    try{
        const {name,email,username,password}=req.body;
        const user=await User.findOne({$or:[{email},{username}]});
        if(user){
            return res.status(400).json({message:"user exists"});

        }
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);


        const newUser= new User({ 
            name,
            email,
            username,
            password:hashedPassword
        });
         await  newUser.save();

         if(newUser){
            res.status(200).json({

                 token:generateTokenAndSetCookie(newUser._id,res),
                id:newUser._id,
                name:newUser.name,
                username:newUser.username,
                email:newUser.email

            })
         }


    }catch(err){
        console.log(err);
    }
}
//Login for user
const loginUser = async (req,res)=>{
    try{
        const {username,password}=req.body; 
        const user= await User.findOne({username});
        const isPasswordCorrect=await bcrypt.compare(password,user?.password|| "");

      if(!user||!isPasswordCorrect) return res.status(400).json({message:"Invalid username or Password"});

      generateTokenAndSetCookie(user._id,res);
      res.status(200).json({
        _id:user._id,
        username:user.username,

      })


    }catch(err){
        console.log(err)
    }
}
const logoutUser=(req,res)=>{
    try{
      res.cookie('jwt',"",{maxage:1});
      res.status(200).json({message:"User logged out succesfully"})
    }catch(err){
        console.log(err)
    }
}

export {signupUser,loginUser,logoutUser};
