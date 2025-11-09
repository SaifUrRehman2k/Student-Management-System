import { Chart } from '@amcharts/amcharts5'
import React from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import FloatingBarChart from '../../Amcharts/FloatingBarChart'
import clock from '../../assets/icons/clock.svg'
import book from '../../assets/icons/book.svg'
import studentHat from '../../assets/icons/studentHat.svg'
import Footer from '../../Components/Footer/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { createToast } from '../../redux/toastSlice.js'
import { removeUser } from '../../redux/userSlice.js'
import { auth } from '../../firebase.js'



const StudentPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(removeUser())
            dispatch(createToast('Signed out Successfully'))
            navigate("/");
        }).catch((error)=> {
            if (error instanceof FirebaseError) {
                const errorMsg = error.message.replace(/^Firebase:\s*/, '').replace(/\s*\(.*\)$/, '');
                console.log(errorMsg);
                dispatch(createToast(errorMsg));
            } else {
                dispatch(createToast(`Unexpected error: ${error}`));
            }
        })
    };

    const user = JSON.parse(localStorage.getItem('currentUser'))
    if(!user) {
        navigate('/')
    }
    // console.log(role);

    return (
        <>
            <header className='border-b-gray-700 border-b-[1px] px-2 py-2 md:py-0 bg-gray-900 text-gray-100'>
                <div className='flex flex-row flex-nowrap items-center justify-between md:container mx-auto'>
                    <h1 className='font-[500] text-[1.5em] '>{user?.first_name +' '+ user?.last_name}</h1>
                    <nav className='hidden flex-row flex-nowrap gap-4 md:flex'>
                        <NavLink to={''} end className='group h-[6em] px-2 flex items-center'>
                            <span className='group-[.active]:border-b-[1px] text-gray-400 group-[.active]:text-gray-100 border-b-gray-100 py-9'>
                                Dashboard
                            </span>
                        </NavLink>
                        <NavLink to={'analyctics'} className='group h-[6em] px-2 flex items-center'>
                            <span className='group-[.active]:border-b-[1px] text-gray-400 group-[.active]:text-gray-100 border-b-gray-100 py-9'>
                                Analyctics
                            </span>
                        </NavLink>
                        <NavLink to={'details'} className='group h-[6em] px-2 flex items-center'>
                            <span className='group-[.active]:border-b-[1px] text-gray-400 group-[.active]:text-gray-100 border-b-gray-100 py-9'>
                                Details
                            </span>
                        </NavLink>
                        <NavLink to={'events'} className='group h-[6em] px-2 flex items-center'>
                            <span className='group-[.active]:border-b-[1px] text-gray-400 group-[.active]:text-gray-100 border-b-gray-100 py-9'>
                                Events
                            </span>
                        </NavLink>
                    </nav>
                    <div className='flex flex-row flex-nowrap gap-8 items-center justify-center'>

                        <div className='rounded-[50%] w-10 h-10 border-[1px] border-gray-200 flex items-center justify-center'>
                            <h1 className='text-[1.4em]'>{user?.first_name.charAt(0)}</h1>
                        </div>
                        <Link title='logout' className='hover:shadow-[2px_2px_18px] hover:shadow-gray-300 cursor-pointer' onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" className='fill-gray-200'><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                        </Link>
                    </div>
                </div>
            </header>
            <section className=' w-screen  h-[56em] md:h-[36em]  bg-gray-900 p-1 sm:p-5 box-border gap-1'>
                <div className='w-full h-full flex flex-col md:flex-row flex-nowrap justify-between items-start box-border container px-12 mx-auto'>
                    <div className='h-full flex flex-col items-start justify-around box-border w-full sm:w-[90%] md:w-[50%]'>
                        <div className='text-gray-200'>
                            <h2 className='sm:text-[2.8em] text-[1.7em] font-[400]'>Welcome back, <b className='text-[1.2em]'>{user?.first_name}</b> </h2>
                            <small className='text-[1em] font-[300]'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
                        </div>
                        <div className='flex flex-col gap-4 w-full'>
                            <h4 className='text-gray-300'>overview</h4>
                            <div className='flex sm:flex-row flex-col sm:flex-nowrap flex-wrap items-center justify-between box-border sm:gap-2 gap-5 w-full text-gray-200'>
                                <div className='flex flex-row flex-nowrap sm:w-[10em] w-full sm:gap-4 gap-12'>
                                    <span className='p-1 bg-gray-700 rounded-2xl flex-1 flex items-center justify-center'>
                                        <img src={clock} alt="" />
                                    </span>
                                    <span className='flex-2'>
                                        <small className='text-[12px] text-gray-500'>Attendance</small>
                                        <h4 className='text-[1.6em]'>{user?.analytics.attendance} <small className='text-[16px] text-gray-400'> days</small></h4>
                                    </span>
                                </div>
                                <div className='flex flex-row flex-nowrap sm:w-[10em] w-full sm:gap-4 gap-12'>
                                    <span className='p-1 bg-gray-700 rounded-2xl flex-1 flex items-center justify-center'>
                                        <img src={book} alt="" />
                                    </span>
                                    <span className='flex-2'>
                                        <small className='text-[12px] text-gray-500'>Assignments</small>
                                        <h4 className='text-[1.6em]'>{user?.analytics.score.assignment}</h4>
                                    </span>
                                </div>
                                <div className='flex flex-row flex-nowrap sm:w-[10em] w-full sm:gap-4 gap-12'>
                                    <span className='p-1 bg-gray-700 rounded-2xl flex-1 flex items-center justify-center'>
                                        <img src={studentHat} alt="" />
                                    </span>
                                    <span className='flex-2'>
                                        <small className='text-[12px] text-gray-500'>Grade</small>
                                        <h4 className='text-[1.6em]'>{(user?.analytics.score.grade).toUpperCase()}</h4>
                                    </span>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className='flex flex-col flex-nowrap  items-center justify-end md:w-[45%] w-full sm:w-[70%] h-[70%] sm:h-[50%] md:h-full'>
                        <div className='flex flex-row flex-nowrap items-center justify-between w-full px-4 text-gray-200'>
                            <h3>Productivity</h3>
                            <h2 className='text-2xl font-[500]'>5 hr 28 min</h2>
                        </div>
                        <div className='w-full h-full md:h-[80%] flex items-center justify-end'>
                            <FloatingBarChart />
                        </div>
                    </div>
                </div>
            </section>


            <Outlet />

            <Footer />
        </>
    )
}

export default StudentPage
