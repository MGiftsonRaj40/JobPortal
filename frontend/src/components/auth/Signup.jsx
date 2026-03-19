import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { AUTH_API_END_POINT } from '@/utils/constant';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        role: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.role) {
            toast.error("Please select a role");
            return;
        }

        try {
            dispatch(setLoading(true));

            const res = await axios.post(`${AUTH_API_END_POINT}/register`, {
                fullname: input.fullname,
                email: input.email,
                password: input.password,
                role: input.role
            });

            toast.success("Signup successful");
            navigate("/login");

        } catch (error) {
            console.log(error.response?.data || error);
            if (error.code === "ERR_NETWORK") {
                toast.error("Backend server is not running on http://localhost:8000");
            } else {
                toast.error(error.response?.data?.message || "Signup failed");
            }
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className='min-h-screen'>
            <Navbar />
            <section className='shell grid gap-8 py-10 lg:grid-cols-[1fr_520px] lg:items-center'>
                <div className='glass-panel relative overflow-hidden p-8 sm:p-10'>
                    <div className='absolute right-0 top-0 h-40 w-40 rounded-full bg-[#0f4c81]/10 blur-3xl' />
                    <p className='text-sm font-semibold uppercase tracking-[0.3em] text-[#8a5a13]'>Create Profile</p>
                    <h1 className='mt-4 max-w-xl text-5xl font-bold leading-tight text-slate-900'>Build a profile that recruiters actually want to open.</h1>
                    <p className='mt-4 max-w-xl text-base leading-7 text-slate-600'>Join the platform to discover curated roles, track applications, and make your first impression feel polished from day one.</p>
                    <div className='mt-8 space-y-4'>
                        {["One-click role selection", "Clean candidate dashboard", "Recruiter-friendly profile setup"].map((item) => (
                            <div key={item} className='flex items-center gap-3 text-slate-700'>
                                <CheckCircle2 className='h-5 w-5 text-[#0f4c81]' />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={submitHandler} className='glass-panel rounded-[32px] p-6 sm:p-8'>
                    <p className='text-sm font-semibold uppercase tracking-[0.3em] text-[#8a5a13]'>Get Started</p>
                    <h2 className='mt-3 text-3xl font-bold text-slate-900'>Sign Up</h2>
                    <p className='mt-2 text-sm leading-6 text-slate-600'>Create your account and choose how you want to use the platform.</p>

                    <div className='mt-6 space-y-4'>
                        <div>
                            <Label className="mb-2 block text-slate-700">Full Name</Label>
                            <Input className="h-12 rounded-2xl border-[#ddcfb7] bg-[#fcfaf5]" type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label className="mb-2 block text-slate-700">Email</Label>
                            <Input className="h-12 rounded-2xl border-[#ddcfb7] bg-[#fcfaf5]" type="email" name="email" value={input.email} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label className="mb-2 block text-slate-700">Password</Label>
                            <Input className="h-12 rounded-2xl border-[#ddcfb7] bg-[#fcfaf5]" type="password" name="password" value={input.password} onChange={changeEventHandler} />
                        </div>
                    </div>

                    <div className='mt-6'>
                        <Label className="mb-3 block text-slate-700">Choose Role</Label>
                        <div className='grid gap-3 sm:grid-cols-2'>
                            <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${input.role === 'student' ? "border-[#0f4c81] bg-[#edf5fb]" : "border-[#ddcfb7] bg-[#fcfaf5]"}`}>
                                <Input className="h-4 w-4 accent-[#0f4c81]" type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} />
                                <span className='font-medium text-slate-800'>Student</span>
                            </label>
                            <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${input.role === 'recruiter' ? "border-[#0f4c81] bg-[#edf5fb]" : "border-[#ddcfb7] bg-[#fcfaf5]"}`}>
                                <Input className="h-4 w-4 accent-[#0f4c81]" type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} />
                                <span className='font-medium text-slate-800'>Recruiter</span>
                            </label>
                        </div>
                    </div>

                    {
                        loading ? 
                        <Button className="mt-6 h-12 w-full rounded-2xl bg-[#0f4c81]">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button> 
                        : 
                        <Button type="submit" className="mt-6 h-12 w-full rounded-2xl bg-[#0f4c81] hover:bg-[#0c3d67]">Create account</Button>
                    }

                    <p className='mt-4 text-sm text-slate-600'>
                        Already have an account? <Link to="/login" className='font-semibold text-[#0f4c81]'>Login</Link>
                    </p>
                </form>
            </section>
        </div>
    );
};

export default Signup;
