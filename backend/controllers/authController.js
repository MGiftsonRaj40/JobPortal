import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// ✅ SIGNUP
export const register = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "Database not connected" });
    }

    const { fullname, email, password, role } = req.body;

    if (!fullname || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: "Registered successfully", user });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message || "Register error" });
  }
};

// ✅ LOGIN
export const login = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "Database not connected" });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const jwtSecret = process.env.JWT_SECRET || process.env.SECRET_KEY;

    if (!jwtSecret) {
      return res.status(500).json({ message: "JWT secret is not configured" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "1d"
    });

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message || "Login error" });
  }
};
