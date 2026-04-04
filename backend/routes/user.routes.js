import express from "express";
import { login, register, updateProfile, logout } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();
const handleSingleUpload = (req, res, next) => {
  singleUpload(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        message: error.message || "File upload failed",
        success: false
      });
    }

    next();
  });
};

// ------------------ Public routes ------------------
router.post("/register", register);
router.post("/login", login);

// ------------------ Protected routes ------------------
router.get("/logout", isAuthenticated, logout);
router.put("/profile", isAuthenticated, handleSingleUpload, updateProfile);
router.post("/profile/update", isAuthenticated, handleSingleUpload, updateProfile);

export default router;
