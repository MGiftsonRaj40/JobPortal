import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { ArrowLeft, MapPin, Briefcase, DollarSign, Clock, Users, Calendar } from 'lucide-react'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false
    const [isApplied, setIsApplied] = useState(isIntiallyApplied)
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const applyJobHandler = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })

            if (res.data.success) {
                setIsApplied(true)
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Failed to apply')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id])

    if (!singleJob) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#7209b7] mx-auto mb-4'></div>
                    <p className='text-gray-600'>Loading job details...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
            {/* Header Section */}
            <div className='bg-white border-b border-gray-200'>
                <div className='max-w-6xl mx-auto px-4 py-6'>
                    <button
                        onClick={() => navigate(-1)}
                        className='flex items-center gap-2 text-[#7209b7] hover:text-[#5f32ad] mb-6 transition'
                    >
                        <ArrowLeft size={20} />
                        Back
                    </button>
                    <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-6'>
                        <div>
                            <h1 className='text-4xl font-bold text-gray-900 mb-3'>{singleJob?.title}</h1>
                            <div className='flex flex-wrap gap-3'>
                                <Badge className='text-blue-700 font-semibold bg-blue-100' variant="ghost">
                                    {singleJob?.position} Positions
                                </Badge>
                                <Badge className='text-orange-700 font-semibold bg-orange-100' variant="ghost">
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className='text-purple-700 font-semibold bg-purple-100' variant="ghost">
                                    ₹{singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied || loading}
                            className={`rounded-lg font-semibold px-8 py-6 text-lg transition ${isApplied
                                    ? 'bg-gray-400 cursor-not-allowed text-white'
                                    : 'bg-[#7209b7] hover:bg-[#5f32ad] text-white'
                                }`}
                        >
                            {loading ? 'Applying...' : isApplied ? '✓ Already Applied' : 'Apply Now'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='max-w-6xl mx-auto px-4 py-10'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Left Column - Main Content */}
                    <div className='lg:col-span-2 space-y-6'>
                        {/* About Company */}
                        {singleJob?.company && (
                            <div className='bg-white rounded-xl shadow-md p-6 border border-gray-100'>
                                <h2 className='text-2xl font-bold text-gray-900 mb-4'>About Company</h2>
                                <div className='flex gap-4 mb-4'>
                                    {singleJob?.company?.logo && (
                                        <img
                                            src={singleJob.company.logo}
                                            alt={singleJob.company.name}
                                            className='w-16 h-16 rounded-lg object-cover'
                                        />
                                    )}
                                    <div>
                                        <h3 className='text-xl font-semibold text-gray-900'>{singleJob?.company?.name}</h3>
                                        <p className='text-sm text-gray-500'>{singleJob?.company?.industry || 'Technology'}</p>
                                    </div>
                                </div>
                                <p className='text-gray-700 leading-relaxed'>{singleJob?.company?.description || 'A leading company in the industry'}</p>
                                {singleJob?.company?.website && (
                                    <a
                                        href={singleJob.company.website}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='text-[#7209b7] hover:underline text-sm mt-3 inline-block'
                                    >
                                        Visit Website →
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Job Description */}
                        <div className='bg-white rounded-xl shadow-md p-6 border border-gray-100'>
                            <h2 className='text-2xl font-bold text-gray-900 mb-4'>Job Description</h2>
                            <p className='text-gray-700 leading-relaxed whitespace-pre-line'>{singleJob?.description}</p>
                        </div>

                        {/* Requirements */}
                        {singleJob?.requirements && singleJob.requirements.length > 0 && (
                            <div className='bg-white rounded-xl shadow-md p-6 border border-gray-100'>
                                <h2 className='text-2xl font-bold text-gray-900 mb-4'>Requirements</h2>
                                <ul className='space-y-2'>
                                    {singleJob.requirements.map((req, idx) => (
                                        <li key={idx} className='flex gap-3 text-gray-700'>
                                            <span className='text-[#7209b7] font-bold'>✓</span>
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className='space-y-6'>
                        {/* Job Details Card */}
                        <div className='bg-white rounded-xl shadow-md p-6 border border-gray-100'>
                            <h3 className='text-lg font-bold text-gray-900 mb-4'>Job Details</h3>
                            <div className='space-y-4'>
                                <div className='flex gap-3'>
                                    <MapPin size={20} className='text-[#7209b7] flex-shrink-0 mt-1' />
                                    <div>
                                        <p className='text-xs text-gray-500 uppercase font-semibold'>Location</p>
                                        <p className='text-gray-900 font-medium'>{singleJob?.location}</p>
                                    </div>
                                </div>

                                <div className='flex gap-3'>
                                    <Briefcase size={20} className='text-[#7209b7] flex-shrink-0 mt-1' />
                                    <div>
                                        <p className='text-xs text-gray-500 uppercase font-semibold'>Experience</p>
                                        <p className='text-gray-900 font-medium'>{singleJob?.experienceLevel}</p>
                                    </div>
                                </div>

                                <div className='flex gap-3'>
                                    <DollarSign size={20} className='text-[#7209b7] flex-shrink-0 mt-1' />
                                    <div>
                                        <p className='text-xs text-gray-500 uppercase font-semibold'>Salary Range</p>
                                        <p className='text-gray-900 font-medium'>₹{singleJob?.salary} LPA</p>
                                    </div>
                                </div>

                                <div className='flex gap-3'>
                                    <Clock size={20} className='text-[#7209b7] flex-shrink-0 mt-1' />
                                    <div>
                                        <p className='text-xs text-gray-500 uppercase font-semibold'>Job Type</p>
                                        <p className='text-gray-900 font-medium'>{singleJob?.jobType}</p>
                                    </div>
                                </div>

                                <div className='flex gap-3'>
                                    <Calendar size={20} className='text-[#7209b7] flex-shrink-0 mt-1' />
                                    <div>
                                        <p className='text-xs text-gray-500 uppercase font-semibold'>Posted Date</p>
                                        <p className='text-gray-900 font-medium'>
                                            {new Date(singleJob?.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex gap-3'>
                                    <Users size={20} className='text-[#7209b7] flex-shrink-0 mt-1' />
                                    <div>
                                        <p className='text-xs text-gray-500 uppercase font-semibold'>Total Applicants</p>
                                        <p className='text-gray-900 font-medium'>{singleJob?.applications?.length || 0} applicants</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Card */}
                        <div className='bg-gradient-to-br from-[#7209b7] to-[#5f32ad] rounded-xl shadow-md p-6 text-white'>
                            <h3 className='text-lg font-bold mb-2'>Ready to Apply?</h3>
                            <p className='text-sm text-purple-100 mb-4'>
                                {isApplied ? 'You have already applied for this position.' : 'Take the next step in your career!'}
                            </p>
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied || loading}
                                className={`w-full rounded-lg font-semibold transition ${isApplied
                                        ? 'bg-white text-[#7209b7] cursor-not-allowed'
                                        : 'bg-white text-[#7209b7] hover:bg-gray-100'
                                    }`}
                            >
                                {loading ? 'Applying...' : isApplied ? 'Already Applied' : 'Apply Now'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription