import mongoose from "mongoose";

interface Imessage{
    senderId:mongoose.Types.ObjectId,
    recieverId:mongoose.Types.ObjectId,
    text?:string,
    image?:string
}

const messageSchema = new mongoose.Schema<Imessage>({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    text: {
        type: String,
    },
    image: {
        type: String
    }

}, { timestamps: true })

export const Message = mongoose.model<Imessage>("Message", messageSchema);
