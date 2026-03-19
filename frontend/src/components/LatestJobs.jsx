import React from "react";
import Job from "./Job";

const LatestJobs = () => {

  const demoJobs = [
    {
      title: "Frontend Developer",
      company: { name: "Google" },
      location: "Bangalore",
      jobType: "Full Time",
      salary: "12 LPA",
      description: "Build modern UI using React and Tailwind CSS."
    },
    {
      title: "Backend Developer",
      company: { name: "Microsoft" },
      location: "Hyderabad",
      jobType: "Full Time",
      salary: "15 LPA",
      description: "Develop scalable backend APIs using Node.js."
    },
    {
      title: "Full Stack Developer",
      company: { name: "Amazon" },
      location: "Remote",
      jobType: "Remote",
      salary: "18 LPA",
      description: "Work on full stack MERN applications."
    },
    {
      title: "React Developer",
      company: { name: "Netflix" },
      location: "Mumbai",
      jobType: "Contract",
      salary: "10 LPA",
      description: "Create fast responsive web applications."
    }
  ];

  return (
    <section className="shell my-20">
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8a5a13]">Fresh Openings</p>
          <h1 className="text-4xl font-bold text-slate-900">
            Latest Jobs
          </h1>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          A handpicked set of current roles across product, engineering, design, and growth teams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoJobs.map((job, index) => (
          <Job key={index} job={job} />
        ))}
      </div>
    </section>
  );
};

export default LatestJobs;
