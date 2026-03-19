import React from "react";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Navbar from "./shared/Navbar";
import Job from "./Job";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-10">
          Available Jobs ({allJobs.length})
        </h1>

        {allJobs.length === 0 ? (
          <div className="rounded-3xl border border-[#eadfca] bg-white/85 p-8 text-center text-slate-600 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            No jobs found in the database yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
