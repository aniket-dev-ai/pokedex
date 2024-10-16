import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/index.js";

export const signUpController = async (req, res) => {
  try {
    const { fullName, userName, phoneNumber, email, password } = req.body;

    if (!fullName || !userName || !phoneNumber || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // check if user already exists with userName or email.
    const userEmailExists = await User.findOne({ email });
    const userUserNameExists = await User.findOne({ userName });

    if (userEmailExists) {
      return res.status(400).json({
        success: false,
        message: "User with this Email already exists!",
      });
    }
    if (userUserNameExists) {
      return res.status(400).json({
        success: false,
        message: "User with this Username already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      userName,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
    });
  }
};

export const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // check if user exists
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // match password
    const isPassMatch = await bcrypt.compare(password, validUser.password);
    if (!isPassMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password!" });
    }

    // set jwt session/cookie
    await generateTokenAndSetCookie(res, validUser._id);

    const { password: pass, ...rest } = validUser._doc;

    return res.status(200).json({
      success: true,
      message: "Signin successful",
      user: rest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
    });
  }
};

export const signout = async (req, res) => {
  res.clearCookie("X_PokAuth_Token");
  return res.status(200).json({
    success: true,
    message: "Signed out",
  });
};

export const checkuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server Error" });
  }
};
