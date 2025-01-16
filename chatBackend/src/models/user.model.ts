import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import { Account } from "./account.model";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    image:{
        type:String
    },
    hashedPassword:{
        type:String,
        required:true
    },
    // conversationIds:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:Conversation
    // }],
    // seenMessageIds:[{
    //    type:mongoose.Schema.Types.ObjectId,
    //    ref: Message
    // }],
    // accounts:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:Account
    // }],
    // message:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:Message
    // }]
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("hashedPassword")){
       return next();
    }

    this.hashedPassword=await bcrypt.hash(this.hashedPassword,10);
    next();
})

export const User=mongoose.model("User",userSchema) 


