import express from "express";
import dotenv from "dotenv";
import connectDB from "../Backend/db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
connectDB();
const app=express();
dotenv.config();

const PORT=process.env.PORT||5000;

app.use(express.json());//to parse json data in the req.body
app.use(express.urlencoded({extended:false}));//to parse form data in req.body
app.use(cookieParser());


//Routes
app.use("/api/users",userRoutes);

app.listen(PORT,()=>{
    console.log(`server connected at port ${PORT}`);
})
