
import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
} from "../controllers/job.controller.js";  

const router = express.Router();

// CREATE job
router.post("/post", isAuthenticated, postJob);

//GET all jobs
router.get("/get", getAllJobs);

// GET admin jobs
router.get("/getadminjobs", isAuthenticated, getAdminJobs);

// GET job by ID
router.get("/get/:id", getJobById);

export default router;
