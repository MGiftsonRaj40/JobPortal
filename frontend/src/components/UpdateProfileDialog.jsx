import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        qualifications: user?.profile?.qualifications?.join(", ") || "",
        branch: user?.profile?.branch || "",
        cgpa: user?.profile?.cgpa ?? "",
        file: null
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        formData.append("qualifications", input.qualifications);
        formData.append("branch", input.branch);
        formData.append("cgpa", input.cgpa);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Profile update failed");
        } finally{
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }



    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-2xl" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                        <DialogDescription>
                            Add your resume, skills, and qualifications so recruiters can review your profile.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4 md:grid-cols-2'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className="text-right md:col-span-1">Name</Label>
                                <Input
                                    id="name"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right md:col-span-1">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className="text-right md:col-span-1">Number</Label>
                                <Input
                                    id="number"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right md:col-span-1">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right md:col-span-1">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    placeholder="React, Node.js, MongoDB"
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-start gap-4'>
                                <Label htmlFor="qualifications" className="pt-2 text-right md:col-span-1">Qualifications</Label>
                                <textarea
                                    id="qualifications"
                                    name="qualifications"
                                    value={input.qualifications}
                                    placeholder="B.Tech CSE, AWS Cloud Practitioner, NPTEL Java"
                                    onChange={changeEventHandler}
                                    rows={3}
                                    className="col-span-3 min-h-[88px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="branch" className="text-right md:col-span-1">Branch</Label>
                                <Input
                                    id="branch"
                                    name="branch"
                                    value={input.branch}
                                    placeholder="CSE"
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="cgpa" className="text-right md:col-span-1">CGPA</Label>
                                <Input
                                    id="cgpa"
                                    name="cgpa"
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={input.cgpa}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4 md:col-span-2'>
                                <Label htmlFor="file" className="text-right md:col-span-1">Resume</Label>
                                <div className='col-span-3 space-y-2'>
                                    <Input
                                        id="file"
                                        name="file"
                                        type="file"
                                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        onChange={fileChangeHandler}
                                    />
                                    <p className='text-xs text-muted-foreground'>
                                        Upload PDF, DOC, or DOCX up to 5MB.
                                    </p>
                                    {(input.file?.name || user?.profile?.resumeOriginalName) && (
                                        <p className='text-xs text-slate-600'>
                                            Selected: {input.file?.name || user?.profile?.resumeOriginalName}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog
