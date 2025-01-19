import { NextFunction, Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler";

const auth = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const sessionToken = req.cookies?.sessionCookie || req.header("Authorization")?.split(" ")[1];
    if (!sessionToken) {
        throw new ErrorHandler({
            status: 401,
            message: "Wrong credentials...",
            success: false
        })
    }

    try {
        const decodedInfo = jwt.verify(sessionToken, String(process.env.JWT_SECRET)) as JwtPayload;

        if (!decodedInfo || decodedInfo === null || !decodedInfo?.id || !decodedInfo?.email) {
            throw new ErrorHandler({
                status: 401,
                message: "Wrong credentials...",
                success: false
            })
        }

        req.user = {
            id: decodedInfo?.id,
            email: decodedInfo?.email
        }

        next();
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        return res.status(500).json({
            status: 500,
            message: "Invalid user...",
            success: false
        })
    }
})

export default auth;