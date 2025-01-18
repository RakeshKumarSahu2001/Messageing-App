import { ZodError, ZodSchema } from "zod";
import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction } from "express";

function zodSchemaValidator(schema: ZodSchema) {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            const parseReq = await schema.parseAsync(body);
            req.body = parseReq;
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ErrorHandler({
                    status: 401,
                    message: error.message,
                    success: false
                })
            }
            next(error)
        }
    }
}

export default zodSchemaValidator;