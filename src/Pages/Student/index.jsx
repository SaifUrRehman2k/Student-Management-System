import { Chart } from '@amcharts/amcharts5'
import React from 'react'
import { Link, NavLink, Outlet } from 'react-router'
import FloatingBarChart from '../../Amcharts/FloatingBarChart'
import clock from '../../assets/icons/clock.svg'
import book from '../../assets/icons/book.svg'
import studentHat from '../../assets/icons/studentHat.svg'
import Footer from '../../Components/Footer/index.jsx'



const StudentPage = () => {
    return (
        <>
            <header className='border-b-gray-700 border-b-[1px] px-2 py-2 md:py-0 bg-gray-900 text-gray-100'>
                <div className='flex flex-row flex-nowrap items-center justify-between md:container mx-auto'>
                    <h1 className='font-[600] text-[2em] '>Student</h1>
                    <nav className='hidden flex-row flex-nowrap gap-4 md:flex'>
                        <NavLink to={'/'} end className='group h-[6em] px-2 flex items-center'>
                            <span className='group-[.active]:border-b-[1px] text-gray-400 group-[.active]:text-gray-100 border-b-gray-100 py-9'>
                                Dashboard
                            </span>
                        </NavLink>
                        <NavLink to={'/analyctics'} className='group h-[6em] px-2 flex items-center'>
                            <span className='group-[.active]:border-b-[1px] text-gray-400 group-[.active]:text-gray-100 border-b-gray-100 py-9'>
                                Analyctics
                            </span>
                        </NavLink>
                        <NavLink to={'/classes'} className='group h-[6em] px-2 flex items-center'>
                            <span className='group-[.active]:border-b-[1px] text-gray-400 group-[.active]:text-gray-100 border-b-gray-100 py-9'>
                                My Classes
                            </span>
                        </NavLink>
                        <NavLink to={'/events'} className='group h-[6em] px-2 flex items-center'>
                            <span className='group-[.active]:border-b-[1px] text-gray-400 group-[.active]:text-gray-100 border-b-gray-100 py-9'>
                                Events
                            </span>
                        </NavLink>
                    </nav>
                    <div className='flex flex-row flex-nowrap gap-2'>
                        <div className='rounded-[50%] w-10 h-10 bg-amber-900'></div>
                        <div className='rounded-[50%] w-10 h-10 bg-amber-900'></div>

                    </div>
                </div>
            </header>
            <section className=' w-screen  h-[56em] md:h-[36em]  bg-gray-900 p-1 sm:p-5 box-border gap-1'>
                <div className='w-full h-full flex flex-col md:flex-row flex-nowrap justify-between items-start box-border container px-12 mx-auto'>
                    <div className='h-full flex flex-col items-start justify-around box-border w-full sm:w-[90%] md:w-[50%]'>
                        <div className='text-gray-200'>
                            <h2 className='sm:text-[2.8em] text-[1.7em] font-[400]'>Welcome back, Ryan</h2>
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
                                        <small className='text-[12px] text-gray-500'>Hello</small>
                                        <h4 className='text-[1.6em]'>12 <small>h</small></h4>
                                    </span>
                                </div>
                                <div className='flex flex-row flex-nowrap sm:w-[10em] w-full sm:gap-4 gap-12'>
                                    <span className='p-1 bg-gray-700 rounded-2xl flex-1 flex items-center justify-center'>
                                        <img src={book} alt="" />
                                    </span>
                                    <span className='flex-2'>
                                        <small className='text-[12px] text-gray-500'>Hello</small>
                                        <h4 className='text-[1.6em]'>12 <small>h</small></h4>
                                    </span>
                                </div>
                                <div className='flex flex-row flex-nowrap sm:w-[10em] w-full sm:gap-4 gap-12'>
                                    <span className='p-1 bg-gray-700 rounded-2xl flex-1 flex items-center justify-center'>
                                        <img src={studentHat} alt="" />
                                    </span>
                                    <span className='flex-2'>
                                        <small className='text-[12px] text-gray-500'>Hello</small>
                                        <h4 className='text-[1.6em]'>12 <small>h</small></h4>
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
