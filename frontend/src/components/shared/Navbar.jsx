import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { BriefcaseBusiness, LogOut, User2 } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logoutHandler = async () => {
        try {
            await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true,
            });

            toast.success("Logout successful");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            dispatch(setUser(null));
            navigate("/login");
        }
    }

    return (
        <header className='sticky top-0 z-50 border-b border-white/40 bg-[#fffaf2]/80 backdrop-blur-xl'>
            <div className='shell flex min-h-[78px] items-center justify-between gap-6'>
                <Link to="/" className='flex items-center gap-3'>
                    <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0f4c81] text-white shadow-lg shadow-[#0f4c81]/20'>
                        <BriefcaseBusiness className='h-5 w-5' />
                    </div>
                    <div>
                        <p className='text-[11px] font-semibold uppercase tracking-[0.35em] text-[#0f4c81]/70'>Career Studio</p>
                        <h1 className='text-2xl font-bold text-slate-900'>Job<span className='text-[#d97706]'>Portal</span></h1>
                    </div>
                </Link>

                <div className='flex items-center gap-6'>
                    <ul className='hidden items-center gap-2 rounded-full border border-white/70 bg-white/70 p-1 text-sm font-medium text-slate-700 shadow-sm md:flex'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link className={`rounded-full px-4 py-2 transition ${location.pathname.startsWith("/admin/companies") ? "bg-[#0f4c81] text-white" : "hover:bg-[#f3eadb]"}`} to="/admin/companies">Companies</Link></li>
                                    <li><Link className={`rounded-full px-4 py-2 transition ${location.pathname.startsWith("/admin/jobs") ? "bg-[#0f4c81] text-white" : "hover:bg-[#f3eadb]"}`} to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link className={`rounded-full px-4 py-2 transition ${location.pathname === "/" ? "bg-[#0f4c81] text-white" : "hover:bg-[#f3eadb]"}`} to="/">Home</Link></li>
                                    <li><Link className={`rounded-full px-4 py-2 transition ${location.pathname === "/jobs" ? "bg-[#0f4c81] text-white" : "hover:bg-[#f3eadb]"}`} to="/jobs">Jobs</Link></li>
                                    <li><Link className={`rounded-full px-4 py-2 transition ${location.pathname === "/browse" ? "bg-[#0f4c81] text-white" : "hover:bg-[#f3eadb]"}`} to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline" className="rounded-full border-[#d9cbb4] bg-white/80 px-5">Login</Button></Link>
                                <Link to="/signup"><Button className="rounded-full bg-[#d97706] px-5 text-white hover:bg-[#b86308]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="h-11 w-11 cursor-pointer border-2 border-white shadow-md">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="user" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 rounded-3xl border border-[#eadfca] bg-white/95 p-5">
                                    <div>
                                        <div className='flex gap-3'>
                                            <Avatar className="h-12 w-12 cursor-pointer border border-[#eadfca]">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="user" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium text-slate-900'>{user?.fullname}</h4>
                                                <p className='text-sm text-slate-500'>{user?.profile?.bio || "Ready for the next opportunity."}</p>
                                            </div>
                                        </div>

                                        <div className='mt-4 flex flex-col gap-1 text-slate-700'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 rounded-full px-2 py-1 transition hover:bg-[#f8f1e5]'>
                                                        <User2 className='h-4 w-4' />
                                                        <Button variant="link" className="h-auto px-0 text-[#0f4c81]">
                                                            <Link to="/profile">View Profile</Link>
                                                        </Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 rounded-full px-2 py-1 transition hover:bg-[#f8f1e5]'>
                                                <LogOut className='h-4 w-4' />
                                                <Button onClick={logoutHandler} variant="link" className="h-auto px-0 text-[#0f4c81]">
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Navbar
