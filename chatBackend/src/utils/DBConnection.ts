import mongoose from "mongoose";

async function DBConnection(uri:string){
    return await mongoose.connect(uri);
}

export default DBConnection;