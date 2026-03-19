import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { USER_API_END_POINT } from '@/utils/constant'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.role) {
            toast.error("Please select a role");
            return;
        }

        try {
            dispatch(setLoading(true));

            const res = await axios.post(`${USER_API_END_POINT}/login`, {
                email: input.email,
                password: input.password,
                role: input.role
            }, {
                withCredentials: true
            });

            //  redux update
            dispatch(setUser(res.data.user));

            toast.success("Login successful");
            navigate("/");

        } catch (error) {
            console.log(error);
            if (error.code === "ERR_NETWORK") {
                toast.error("Backend server is not running on http://localhost:8000");
            } else {
                toast.error(error.response?.data?.message || "Login failed");
            }
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (!loading && user) {
            navigate("/");
        }
    }, [loading, user, navigate]);

    return (
        <div className='min-h-screen'>
            <Navbar />
            <section className='shell grid gap-8 py-10 lg:grid-cols-[1fr_520px] lg:items-center'>
                <div className='glass-panel relative overflow-hidden p-8 sm:p-10'>
                    <div className='absolute left-0 top-0 h-40 w-40 rounded-full bg-[#d97706]/10 blur-3xl' />
                    <p className='text-sm font-semibold uppercase tracking-[0.3em] text-[#8a5a13]'>Welcome Back</p>
                    <h1 className='mt-4 max-w-xl text-5xl font-bold leading-tight text-slate-900'>Step back into your job search with momentum.</h1>
                    <p className='mt-4 max-w-xl text-base leading-7 text-slate-600'>Review fresh roles, manage applications, and keep your next move organized in one calm workspace.</p>
                    <div className='mt-8 space-y-4'>
                        {["Fast login for students and recruiters", "Simple application tracking", "Consistent access across the platform"].map((item) => (
                            <div key={item} className='flex items-center gap-3 text-slate-700'>
                                <CheckCircle2 className='h-5 w-5 text-[#d97706]' />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={submitHandler} className='glass-panel rounded-[32px] p-6 sm:p-8'>
                    <p className='text-sm font-semibold uppercase tracking-[0.3em] text-[#8a5a13]'>Access Account</p>
                    <h2 className='mt-3 text-3xl font-bold text-slate-900'>Login</h2>
                    <p className='mt-2 text-sm leading-6 text-slate-600'>Choose your role and continue where you left off.</p>

                    <div className='mt-6 space-y-4'>
                        <div>
                            <Label className="mb-2 block text-slate-700">Email</Label>
                            <Input
                                className="h-12 rounded-2xl border-[#ddcfb7] bg-[#fcfaf5]"
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="example@gmail.com"
                            />
                        </div>

                        <div>
                            <Label className="mb-2 block text-slate-700">Password</Label>
                            <Input
                                className="h-12 rounded-2xl border-[#ddcfb7] bg-[#fcfaf5]"
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="Enter password"
                            />
                        </div>
                    </div>

                    <div className='mt-6'>
                        <Label className="mb-3 block text-slate-700">Choose Role</Label>
                        <RadioGroup className="grid gap-3 sm:grid-cols-2">
                            <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${input.role === 'student' ? "border-[#d97706] bg-[#fff3df]" : "border-[#ddcfb7] bg-[#fcfaf5]"}`}>
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="h-4 w-4 cursor-pointer accent-[#d97706]"
                                />
                                <span className='font-medium text-slate-800'>Student</span>
                            </label>

                            <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${input.role === 'recruiter' ? "border-[#d97706] bg-[#fff3df]" : "border-[#ddcfb7] bg-[#fcfaf5]"}`}>
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="h-4 w-4 cursor-pointer accent-[#d97706]"
                                />
                                <span className='font-medium text-slate-800'>Recruiter</span>
                            </label>
                        </RadioGroup>
                    </div>

                    {
                        loading
                            ? <Button className="mt-6 h-12 w-full rounded-2xl bg-[#d97706]">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                              </Button>
                            : <Button type="submit" className="mt-6 h-12 w-full rounded-2xl bg-[#d97706] hover:bg-[#b86308]">
                                Login
                              </Button>
                    }

                    <p className='mt-4 text-sm text-slate-600'>
                        Don't have an account?
                        <Link to="/signup" className='font-semibold text-[#0f4c81]'> Signup</Link>
                    </p>
                </form>
            </section>
        </div>
    )
}

export default Login
