import express, { NextFunction, Request, Response } from "express"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}))

app.use(cookieParser());

//user routes
import userRoutes from "./routes/user.routes"
import ErrorHandler from "./utils/ErrorHandler";
app.use("/api/v1/users", userRoutes);

//message routes
import messageRoutes from "./routes/message.routes"
app.use("/api/v1/message",messageRoutes);


app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorHandler) {
        res.status(err.status).json({
            message: err.message,
            status: err.status,
            success: err.success
        })
    } 
        res.status(500).json({
            success: false,
            message: "Something went wrong...",
            status: 500
        })
    
})

export default app;