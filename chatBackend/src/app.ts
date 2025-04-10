import express, { NextFunction, Request, Response } from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
// import { app} from "./utils/socket";
import {Server} from "socket.io";
import http from "http";

const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin: "http://localhost:5173",
        credentials: true,
    }
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}))

app.use(cookieParser());

const userSockets: Record<string, string>={}

function getRecieverSocketInfo(userId:string){
    return userSockets[userId];
}


io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    const userId=socket.handshake.query.userId as string;
    if(userId){
        userSockets[userId]=socket.id
    }

    io.emit("getOnlineUsers",Object.keys(userSockets))
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete userSockets[userId];
        io.emit("getOnlineUsers",Object.keys(userSockets))
    });
});

//user routes
import userRoutes from "./routes/user.routes"
import ErrorHandler from "./utils/ErrorHandler";
app.use("/api/v1/users", userRoutes);

//message routes
import messageRoutes from "./routes/message.routes"
app.use("/api/v1/messages",messageRoutes);


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

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         credentials: true,
//     }
// });



export { io, app, server,getRecieverSocketInfo };