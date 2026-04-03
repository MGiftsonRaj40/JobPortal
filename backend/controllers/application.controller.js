import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import User from "../models/user.model.js";

const normalizeSkills = (skills = []) =>
    skills
        .filter(Boolean)
        .map((skill) => skill.toString().trim().toLowerCase())
        .filter(Boolean);

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        const applicant = await User.findById(userId);
        if (!applicant) {
            return res.status(404).json({
                message: "Applicant not found.",
                success: false
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        const applicantSkills = normalizeSkills(applicant?.profile?.skills);
        const jobRequirements = normalizeSkills(job.requirements);
        const matchedSkills = jobRequirements.filter((requirement) => applicantSkills.includes(requirement));
        const matchPercentage = jobRequirements.length
            ? Math.round((matchedSkills.length / jobRequirements.length) * 100)
            : 0;
    
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
            matchPercentage,
            matchedSkills
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true,
            application: newApplication
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const minCgpa = Number(req.query.cgpa || 0);
        const branch = (req.query.branch || "").trim().toLowerCase();
        const skills = (req.query.skills || "")
            .split(",")
            .map((skill) => skill.trim().toLowerCase())
            .filter(Boolean);

        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };

        const filteredApplications = job.applications.filter((application) => {
            const applicant = application.applicant;
            const applicantBranch = applicant?.profile?.branch?.trim().toLowerCase() || "";
            const applicantCgpa = Number(applicant?.profile?.cgpa || 0);
            const applicantSkills = normalizeSkills(applicant?.profile?.skills);

            const branchMatches = !branch || applicantBranch === branch;
            const cgpaMatches = !Number.isFinite(minCgpa) || applicantCgpa >= minCgpa;
            const skillsMatch = !skills.length || skills.every((skill) => applicantSkills.includes(skill));

            return branchMatches && cgpaMatches && skillsMatch;
        });

        return res.status(200).json({
            job: {
                ...job.toObject(),
                applications: filteredApplications
            }, 
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        const normalizedStatus = status.toLowerCase();
        if (!["applied", "shortlisted", "rejected"].includes(normalizedStatus)) {
            return res.status(400).json({
                message:"Invalid status.",
                success:false
            });
        }

        // update the status
        application.status = normalizedStatus;
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}
