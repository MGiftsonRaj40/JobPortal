import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate(`/description/${job._id}`);
  };

  return (
    <div className="group rounded-[28px] border border-[#eadfca] bg-white/85 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {job?.title || "Frontend Developer"}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {job?.company?.name || "Google"} • {job?.location || "Remote"}
          </p>
        </div>

        <span className="rounded-full bg-[#edf5fb] px-3 py-1 text-xs font-semibold text-[#0f4c81]">
          {job?.jobType || "Full Time"}
        </span>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
        {job?.description || "Exciting opportunity to work with modern technologies and build scalable applications."}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-[#15803d]">
          ₹{job?.salary || "10 LPA"}
        </span>

        <button
          onClick={handleApplyClick}
          className="inline-flex items-center gap-2 rounded-full bg-[#d97706] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b86308]">
          Apply Now
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </button>
      </div>

    </div>
  );
};

export default Job;
