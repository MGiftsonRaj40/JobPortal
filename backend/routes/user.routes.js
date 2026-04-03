import express from "express";
import { login, register, updateProfile, logout } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

// ------------------ Public routes ------------------
router.post("/register", register);
router.post("/login", login);

// ------------------ Protected routes ------------------
router.get("/logout", isAuthenticated, logout);
router.put("/profile", isAuthenticated, singleUpload, updateProfile);
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);

export default router;
