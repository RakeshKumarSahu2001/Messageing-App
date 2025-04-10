import AsyncHandler from "../utils/AsyncHandler";
import { User } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { Message } from "../models/message.model";
import { getRecieverSocketInfo, io } from "../app";

export const getFriendList = AsyncHandler(async (req, res) => {
    try {
        const friendList = await User.find({ _id: { $ne: req?.user?.id } }).select("-hashedPassword");

        if (!friendList) {
            res.status(200).json({
                success: true,
                message: "No record found",
                status: 200,
                data: friendList
            })
        }

        res.status(200).json({
            success: true,
            message: "data fetched successfully...",
            status: 200,
            data: friendList
        })
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error
        }
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong while fetching the friendlist..."
        })
    }
})

export const getMessage = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const myId = req.user?.id;
    if (!id || !myId) {
        throw new ErrorHandler({
            success: false,
            status: 404,
            message: "User not forund..."
        })
    }
    try {
        const userChat = await Message.find({
            $or: [
                { senderId: myId, recieverId: id },
                { recieverId: myId, senderId: id }
            ]
        });

        res.status(200).json({
            success: true,
            status: 200,
            message: "Messages fetched successfully...",
            data: userChat
        })
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error
        }
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong while fetching the friendlist..."
        })
    }
})

export const sendMessage = AsyncHandler(async (req, res) => {
    const { id: recieverId } = req.params;
    const body=req.body;
    const myId=req.user?.id;
    if (!recieverId || !myId) {
        throw new ErrorHandler({
            status: 404,
            message: "Invalid user...",
            success: false
        })
    }

    try {
        const newMessage=await Message.create({
            senderId:myId,
            recieverId:recieverId,
            text:body?.message,
            image:body?.image
        });

        const recieverSocketId=getRecieverSocketInfo(recieverId);

        if(recieverSocketId){
           io.to(recieverSocketId).emit("newMessage",newMessage); 
        }

        console.log("newMessage : ",newMessage);

        res.status(201).json({
            success:true,
            messsage:"Message send successfully...",
            status:200
        });
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong while fetching the friendlist..."
        })
    }
})