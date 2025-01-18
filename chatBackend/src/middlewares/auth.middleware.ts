import { NextFunction,Request,Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler";

const auth=AsyncHandler(async(req:Request,res:Response,next:NextFunction)=>{

    const sessionToken=req.cookies?.sessionCookie||req.header("Authorization")?.split(" ")[1];
    if(!sessionToken){
        throw new ErrorHandler({
            status:401,
            message:"Wrong credentials...",
            success:false
        })
    }
    try {
        const decodedInfo=jwt.verify(sessionToken,process.env.JWT_SECRET as string);
        if(!decodedInfo || decodedInfo == null || !decodedInfo.id || !decodedInfo.email){
            throw new ErrorHandler({
                status:401,
                message:"Wrong credentials...",
                success:false
            })
        }

        console.log("sessionToken",sessionToken,decodedInfo);
        // req.user=JSON.parse(decodedInfo as string);
        next();
    } catch (error) {
        throw new ErrorHandler({
            status:500,
            message:"Invalid user...",
            success:false
        })
    }
})

export default auth;