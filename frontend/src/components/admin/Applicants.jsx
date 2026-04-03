import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application);
    const [filters, setFilters] = useState({
        skills: "",
        cgpa: "",
        branch: ""
    });

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const query = new URLSearchParams();
                if (filters.skills.trim()) query.set("skills", filters.skills.trim());
                if (filters.cgpa !== "") query.set("cgpa", filters.cgpa);
                if (filters.branch.trim()) query.set("branch", filters.branch.trim());

                const url = `${APPLICATION_API_END_POINT}/${params.id}/applicants${query.toString() ? `?${query.toString()}` : ""}`;
                const res = await axios.get(url, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [dispatch, filters, params.id]);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
                <div className='grid gap-4 rounded-xl border bg-white p-4 md:grid-cols-3'>
                    <input
                        className='rounded-md border px-3 py-2'
                        placeholder='Skills: React, Node.js'
                        value={filters.skills}
                        onChange={(e) => setFilters((prev) => ({ ...prev, skills: e.target.value }))}
                    />
                    <input
                        className='rounded-md border px-3 py-2'
                        placeholder='Minimum CGPA'
                        type='number'
                        min='0'
                        max='10'
                        step='0.1'
                        value={filters.cgpa}
                        onChange={(e) => setFilters((prev) => ({ ...prev, cgpa: e.target.value }))}
                    />
                    <input
                        className='rounded-md border px-3 py-2'
                        placeholder='Branch'
                        value={filters.branch}
                        onChange={(e) => setFilters((prev) => ({ ...prev, branch: e.target.value }))}
                    />
                </div>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants
