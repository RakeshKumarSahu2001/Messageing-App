import { NextFunction, Request, Response } from "express";

const AsyncHandler=(requestHandler:(req:Request,res:Response,next:NextFunction)=>Promise<unknown>)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            await requestHandler(req,res,next)
        } catch (error:unknown) {
           next(error); 
        }
    }
}

export default AsyncHandler;