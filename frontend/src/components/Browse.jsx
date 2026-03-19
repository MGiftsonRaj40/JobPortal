import React, { useEffect, useMemo, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { ArrowRight, Search } from 'lucide-react';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const {allJobs, searchedQuery} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    const [query, setQuery] = useState(searchedQuery);
    const filteredJobs = useMemo(() => {
        const normalizedQuery = searchedQuery.trim().toLowerCase();

        if (!normalizedQuery) {
            return allJobs;
        }

        return allJobs.filter((job) => {
            const searchableFields = [
                job?.title,
                job?.description,
                job?.location,
                job?.jobType,
                job?.company?.name,
                ...(job?.requirements || []),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchableFields.includes(normalizedQuery);
        });
    }, [allJobs, searchedQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearchedQuery(query.trim()));
    };

    useEffect(() => {
        setQuery(searchedQuery);
    }, [searchedQuery]);

    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[dispatch])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <h1 className='font-bold text-xl my-10'>Search Results ({filteredJobs.length})</h1>

                <form
                    onSubmit={handleSearch}
                    className='mb-8 flex flex-col gap-3 rounded-[24px] border border-[#eadfca] bg-white/90 p-3 shadow-lg shadow-[#0f4c81]/5 sm:flex-row'
                >
                    <div className='relative flex-1'>
                        <Search className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400' />
                        <input
                            type='text'
                            placeholder='Search roles, skills, or companies'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className='h-14 w-full rounded-2xl border border-transparent bg-[#fcfaf5] pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#0f4c81]/30'
                        />
                    </div>

                    <button className='inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#0f4c81] px-6 text-sm font-semibold text-white transition hover:bg-[#0c3d67]'>
                        Search jobs
                        <ArrowRight className='h-4 w-4' />
                    </button>
                </form>

                {filteredJobs.length === 0 ? (
                    <div className='rounded-3xl border border-[#eadfca] bg-white/85 p-8 text-center text-slate-600 shadow-[0_18px_50px_rgba(15,23,42,0.08)]'>
                        No matching jobs found.
                    </div>
                ) : (
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        {
                            filteredJobs.map((job) => {
                                return (
                                    <Job key={job._id} job={job}/>
                                )
                            })
                        }
                    </div>
                )}

            </div>
        </div>
    )
}

export default Browse
