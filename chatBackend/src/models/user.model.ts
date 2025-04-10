import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser{
    name:string;
    email:string;
    image?:string;
    hashedPassword:string;
    
}
interface IUserMethods {
    isPasswordCorrect(password:string):Promise<boolean>;
  }
// Create a new Model type that knows about IUserMethods...
type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema=new mongoose.Schema<IUser,UserModel,IUserMethods>({
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
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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


userSchema.methods.isPasswordCorrect=async function(  this: IUser,password:string) {
    return await bcrypt.compare(password,this.hashedPassword)
}

export const User=mongoose.model<IUser,UserModel>("User",userSchema) 


