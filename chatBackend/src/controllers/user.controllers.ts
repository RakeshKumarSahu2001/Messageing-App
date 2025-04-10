import AsyncHandler from "../utils/AsyncHandler";
import { User } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import SessionCookieGenerate from "../utils/SessionCookieGenerate";
import uploadOnCloudinary from "../services/uploadOnCloudinary.service";

export const userRegister = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      throw new ErrorHandler({
        status: 401,
        success: false,
        message: "User already exist..",
      });
    }

    const newUser = await User.create({
      email,
      name,
      hashedPassword: password,
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "User registerd successfully.",
      data: {
        id: newUser?._id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof ErrorHandler) {
      throw error;
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong...",
      status: 500,
    });
  }
});

const cookieParams = {
  secure: true,
  httpOnly: true,
  // expires: new Date(Date.now() / 1000 + 24 * 60 * 60 * 1000)
};

export const userLogin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ErrorHandler({
        status: 404,
        message: "User does not exist...",
        success: false,
      });
    }

    const isPasswordCorrect = await user?.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new ErrorHandler({
        status: 401,
        message: "Wrong credentials...",
        success: false,
      });
    }

    const sessionCookie = SessionCookieGenerate(user?.id, user?.email);

    res
      .cookie("sessionCookie", sessionCookie, cookieParams)
      .status(200)
      .json({
        success: true,
        message: "Login Successfully...",
        status: 200,
        data: {
          id: user._id,
          email: user.email,
          name: user?.name,
        },
      });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    res.status(500).json({
      success: false,
      message: "Something went wrong...",
      status: 500,
    });
  }
});

export const userLogout = AsyncHandler(async (req, res) => {
  try {
    res.clearCookie("sessionCookie", cookieParams).status(200).json({
      success: true,
      message: "logout successfully.",
      status: 200,
    });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    res.status(500).json({
      success: false,
      status: 500,
      message: "Something went wrong on the logout section...",
    });
  }
});

export const updateUserProfile = AsyncHandler(async (req, res) => {
  const localPath = req.file?.path;
  console.log("localpath :",req)
  try {
    if (!localPath) {
      throw new ErrorHandler({
        status: 404,
        message: "image does not exist...",
        success: false,
      });
    }
    const cloudinaryResponse = await uploadOnCloudinary(localPath);

    const updateProfile = await User.findByIdAndUpdate(req.user?.id, {
      image: cloudinaryResponse?.secure_url,
    }).select("-hashedPassword");

    res.status(200).json({
      data: {
        id: updateProfile?._id,
        email: updateProfile?.email,
        name: updateProfile?.name,
        image: updateProfile?.image,
      },
      success: true,
      message: "Profile updated successfully...",
      status: 200,
    });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    res.status(500).json({
      success: false,
      message: "Something went wrong...",
      status: 500,
    });
  }
});

export const chat = AsyncHandler(async (req, res) => {
  res.status(200).json({
    message: "hello from the server",
    success: true,
    status: 200,
  });
});
