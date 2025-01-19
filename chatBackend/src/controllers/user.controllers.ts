import AsyncHandler from "../utils/AsyncHandler"
import { User } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import SessionCookieGenerate from "../utils/SessionCookieGenerate";

export const userRegister = AsyncHandler(async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            throw new ErrorHandler({
                status: 401,
                success: false,
                message: "User already exist.."
            })
        }

        const newUser = await User.create({
            email,
            name,
            hashedPassword: password
        });

        return res.status(201).json({
            success: true,
            status: 201,
            message: "User registerd successfully.",
            data: {
                id: newUser?._id,
                email: newUser?.email
            }
        })
    } catch (error: unknown) {
        if (error instanceof ErrorHandler) {
            throw error;
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong...",
            status: 500
        })
    }
})


const cookieParams = {
    secure: true,
    httpOnly: true,
    // expires: new Date(Date.now() / 1000 + 24 * 60 * 60 * 1000)
}

export const userLogin = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new ErrorHandler({
                status: 404,
                message: "User does not exist...",
                success: false
            })
        }

        const isPasswordCorrect = await user?.isPasswordCorrect(password);

        if (!isPasswordCorrect) {
            throw new ErrorHandler({
                status: 401,
                message: "Wrong credentials...",
                success: false
            })
        }

        const sessionCookie = SessionCookieGenerate(user?.id, user?.email);

        return res.cookie("sessionCookie", sessionCookie, cookieParams)
            .status(200)
            .json({
                success: true,
                message: "Login Successfully...",
                status: 200,
                data: {
                    id: user._id,
                    email: user.email
                }
            })


    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong...",
            status: 500
        })
    }
})

export const userLogout = AsyncHandler(async (req, res) => {
    try {
        return res.clearCookie("sessionCookie", cookieParams).status(200).json({
            success: true,
            message: "logout successfully.",
            status: 200
        })
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        return res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong on the logout section..."
        })
    }
})

export const chat = AsyncHandler(async (req, res) => {
    res.status(200).json({
        message: "hello from the server",
        success: true,
        status: 200
    })
})