import { Request,Response } from "express"
import AsyncHandler from "../utils/AsyncHandler"
import { User } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";

export const userRegister=AsyncHandler(async(req:Request,res:Response)=>{
    const {email,name,password}=req.body;
    try {
        const isUserExist=await User.findOne(email);
        if(isUserExist){
            throw new ErrorHandler({
                status:401,
                success:false,
                message:"User already exist.."
            })
        }

        const newUser=await User.create({
            email,
            name,
            hashedPassword:password
        });
        console.log("new user",newUser);
        
       return res.status(201).json({
        success:true,
        status:201,
        message:"User registerd successfully."
       })
    } catch (error) {
        throw new ErrorHandler({
            status:500,
            message:error.message,
            success:false
        })
    }
})