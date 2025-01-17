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
        throw new ErrorHandler({
            status: 500,
            message: "Something went wrong",
            success: false
        })
    }
})


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
        
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        console.log(user,password,isPasswordCorrect);

        if (!isPasswordCorrect) {
            throw new ErrorHandler({
                status: 401,
                message: "Wrong credentials...",
                success: false
            })
        }

        const sessionCookie=SessionCookieGenerate(user?.id,user?.email);


        return res.cookie("sessionCookie",sessionCookie).status(200).json({
            success: true,
            message: "Login Successfully...",
            status: 200,
            data: {
                id: user._id,
                email: user.email
            }
        })


    } catch (error) {
        throw new ErrorHandler({
            status: 500,
            message: "Something went wrong...",
            success: false
        })
    }
})