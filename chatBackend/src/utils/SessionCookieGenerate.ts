import ErrorHandler from "./ErrorHandler"
import jwt from "jsonwebtoken";

function SessionCookieGenerate(id: string, email: string): string {
    try {
        const jwtSession = jwt.sign(
            { id, email, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
            process.env.JWT_SECRET as string,
            { algorithm: process.env.JWT_ALGORITHM as jwt.Algorithm }
        );

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