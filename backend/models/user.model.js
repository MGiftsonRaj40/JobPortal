import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, trim: true },
    email: { type: String, unique: true, trim: true },
    password: String,
    phoneNumber: { type: String, trim: true, default: "" },
    role: { type: String, enum: ["student", "recruiter"], default: "student" },
    profile: {
      bio: { type: String, default: "" },
      skills: { type: [String], default: [] },
      branch: { type: String, default: "" },
      cgpa: { type: Number, default: null },
      resume: { type: String, default: "" },
      resumeOriginalName: { type: String, default: "" },
      profilePhoto: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
