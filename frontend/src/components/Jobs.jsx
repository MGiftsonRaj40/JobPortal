import React from "react";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Navbar from "./shared/Navbar";
import Job from "./Job";

const fallbackJobs = [
  {
    _id: null,
    title: "Frontend Developer Intern",
    company: { name: "BrightStack Labs" },
    location: "Bangalore",
    jobType: "Internship",
    salary: "6 LPA",
    description: "Build polished React interfaces and collaborate with product designers on campus-focused features."
  },
  {
    _id: null,
    title: "Backend Developer Trainee",
    company: { name: "Nexa Systems" },
    location: "Hyderabad",
    jobType: "Full Time",
    salary: "7 LPA",
    description: "Work on backend APIs, database queries, and service integrations using Node.js and MongoDB."
  },
  {
    _id: null,
    title: "Full Stack Graduate Engineer",
    company: { name: "OrbitHive" },
    location: "Pune",
    jobType: "Full Time",
    salary: "8 LPA",
    description: "Contribute across frontend and backend modules for a fast-moving SaaS product team."
  },
  {
    _id: null,
    title: "React UI Developer",
    company: { name: "PixelForge" },
    location: "Remote",
    jobType: "Remote",
    salary: "9 LPA",
    description: "Create responsive dashboards, reusable components, and accessible UI flows with React."
  },
  {
    _id: null,
    title: "Software Engineer - Entry Level",
    company: { name: "CodeCrest" },
    location: "Mumbai",
    jobType: "Full Time",
    salary: "10 LPA",
    description: "Join the engineering team to build product features, debug issues, and ship reliable releases."
  },
  {
    _id: null,
    title: "MERN Stack Developer",
    company: { name: "LaunchLayer" },
    location: "Delhi NCR",
    jobType: "Contract",
    salary: "8.5 LPA",
    description: "Build end-to-end MERN features including APIs, admin tools, and candidate-facing dashboards."
  }
];

const Jobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const jobsToRender = allJobs.length > 0 ? allJobs : fallbackJobs;

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-10">
          Available Jobs ({jobsToRender.length})
        </h1>

        {allJobs.length === 0 && (
          <div className="mb-8 rounded-3xl border border-[#eadfca] bg-[#fff8ed] p-5 text-sm text-[#8a5a13] shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            Showing sample jobs because no backend job records were found yet.
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobsToRender.map((job, index) => (
            <Job key={job._id || `${job.title}-${index}`} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
