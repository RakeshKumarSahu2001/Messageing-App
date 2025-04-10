import { v2 as cloudinary } from "cloudinary";
import ErrorHandler from "../utils/ErrorHandler";
import fs from "fs";

async function uploadOnCloudinary(localfilePath:string) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    try {
        if(!localfilePath){
          return null
        }

        // Upload an image
        const uploadResult = await cloudinary.uploader
            .upload(
                localfilePath, {
                    resource_type: "auto",
            }
            );

            fs.unlinkSync(localfilePath);

            return uploadResult;
    } catch (error) {
        fs.unlinkSync(localfilePath);
        throw new ErrorHandler({
            status:500,
            message:"File upload error...",
            success:false
        })
    }
}

export default uploadOnCloudinary;