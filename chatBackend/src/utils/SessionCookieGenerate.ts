import ErrorHandler from "./ErrorHandler"
import jwt from "jsonwebtoken";

function SessionCookieGenerate(id: string, email: string): string {
    try {
        const jwtSecret = process.env.JWT_SECRET;
        const jwtAlgorithm = process.env.JWT_ALGORITHM;

        // Check if the required environment variables are set
        if (!jwtSecret) {
            console.log("cant found secret...")
        }
        const jwtSession = jwt.sign({ id, email }, jwtSecret, jwtAlgorithm);
        return jwtSession;
    } catch (error) {
        throw new ErrorHandler({
            status: 500,
            success: false,
            message: "Something went wrong during session generation.."
        })
    }
}

export default SessionCookieGenerate