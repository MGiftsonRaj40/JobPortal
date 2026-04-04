import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }

    let cloudResponse;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse ? cloudResponse.secure_url : ""
      }
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false
    });
  }
};


// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false
      });
    }

    const jwtSecret = process.env.JWT_SECRET_KEY || process.env.SECRET_KEY || process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({
        message: "JWT secret is not configured",
        success: false
      });
    }

    const tokenData = {
      userId: user._id
    };

    const token = jwt.sign(
      tokenData,
      jwtSecret,
      { expiresIn: "1d" }
    );

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true
      });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false
    });
  }
};


// LOGOUT
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({
        message: "Logged out successfully",
        success: true
      });

  } catch (error) {
    console.log(error);
  }
};


// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills, qualifications, branch, cgpa } = req.body;
    const file = req.file;

    let cloudResponse;

    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw",
        folder: "jobportal/resumes"
      });
    }

    const parseList = (value) =>
      value
        .split(/[\n,]+/)
        .map((item) => item.trim())
        .filter(Boolean);

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (!user.profile) user.profile = {};
    if (bio !== undefined) user.profile.bio = bio;
    if (skills !== undefined) user.profile.skills = parseList(skills);
    if (qualifications !== undefined) user.profile.qualifications = parseList(qualifications);
    if (branch !== undefined) user.profile.branch = branch;
    if (cgpa !== undefined) {
      user.profile.cgpa = cgpa === "" ? null : Number(cgpa);
    }

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false
    });
  }
};
