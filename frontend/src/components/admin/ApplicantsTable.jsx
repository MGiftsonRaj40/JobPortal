import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setAllApplicants } from '@/redux/applicationSlice';

const shortlistingStatus = ["Shortlisted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const dispatch = useDispatch();

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                const updatedApplicants = {
                    ...applicants,
                    applications: applicants?.applications?.map((item) =>
                        item._id === id ? { ...item, status: status.toLowerCase() } : item
                    )
                };
                dispatch(setAllApplicants(updatedApplicants));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Branch</TableHead>
                        <TableHead>CGPA</TableHead>
                        <TableHead>Match</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>{item?.applicant?.profile?.branch || "NA"}</TableCell>
                                <TableCell>{item?.applicant?.profile?.cgpa ?? "NA"}</TableCell>
                                <TableCell>
                                    <div className='font-medium'>{item?.matchPercentage ?? 0}%</div>
                                    <div className='text-xs text-slate-500'>{item?.matchedSkills?.join(", ") || "No matched skills"}</div>
                                </TableCell>
                                <TableCell >
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell className='capitalize'>{item?.status}</TableCell>
                                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </tr>
                        ))
                    }

                </TableBody>

            </Table>
        </div>
    )
}

export default ApplicantsTable
