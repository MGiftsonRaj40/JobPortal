import { useState } from "react";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchedQuery(query.trim()));
    navigate("/browse");
  };

  return (
    <section className="shell relative overflow-hidden py-12 md:py-20">
      <div className="glass-panel relative overflow-hidden px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#f59e0b]/15 blur-3xl" />
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#0f4c81]/15 blur-3xl" />

        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative z-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#eadfca] bg-white/80 px-4 py-2 text-sm font-medium text-[#8a5a13] shadow-sm">
              <Sparkles className="h-4 w-4" />
              Trusted by growing teams and ambitious candidates
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight text-slate-900 md:text-6xl">
              Find work that fits your pace, values, and next bold move.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Explore curated roles, discover standout companies, and move from searching to shortlisted with a cleaner hiring experience.
            </p>

            <form
              onSubmit={handleSearch}
              className="mt-8 flex flex-col gap-3 rounded-[24px] border border-[#eadfca] bg-white/90 p-3 shadow-lg shadow-[#0f4c81]/5 sm:flex-row"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search roles, skills, or companies"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-transparent bg-[#fcfaf5] pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#0f4c81]/30"
                />
              </div>

              <button className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#0f4c81] px-6 text-sm font-semibold text-white transition hover:bg-[#0c3d67]">
                Search jobs
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-[#fff4dc] px-4 py-2">Remote friendly</span>
              <span className="rounded-full bg-[#edf5fb] px-4 py-2">Top startup roles</span>
              <span className="rounded-full bg-[#f7ece5] px-4 py-2">Recruiter dashboard</span>
            </div>
          </div>

          <div className="relative z-10">
            <div className="rounded-[32px] bg-[#16324f] p-6 text-white shadow-2xl shadow-[#16324f]/20">
              <div className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/10 p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">Placement Pulse</p>
                  <h2 className="mt-2 text-3xl font-bold">12k+</h2>
                </div>
                <span className="rounded-full bg-[#f59e0b] px-3 py-1 text-xs font-semibold text-[#16324f]">Live talent market</span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] bg-white/10 p-4">
                  <p className="text-sm text-white/70">Active roles</p>
                  <p className="mt-2 text-2xl font-bold">2,480</p>
                </div>
                <div className="rounded-[24px] bg-white/10 p-4">
                  <p className="text-sm text-white/70">Hiring partners</p>
                  <p className="mt-2 text-2xl font-bold">320+</p>
                </div>
                <div className="rounded-[24px] bg-white/10 p-4 sm:col-span-2">
                  <p className="text-sm text-white/70">Popular this week</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-white/15 px-3 py-2">React</span>
                    <span className="rounded-full bg-white/15 px-3 py-2">Node.js</span>
                    <span className="rounded-full bg-white/15 px-3 py-2">UI/UX</span>
                    <span className="rounded-full bg-white/15 px-3 py-2">Data Science</span>
                  </div>
                </div>
              </div>

              <Link to="/browse" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#ffd48a]">
                Browse all opportunities
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
