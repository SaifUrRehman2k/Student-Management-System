import React from 'react'
import { Outlet } from 'react-router'

const LoginPage = () => {
    return (
        <div className='w-screen h-screen bg-[url(../../../src/assets/images/stats-bg.jpg)] bg-cover bg-no-repeat bg-left text-gray-800'>
            <div className='w-full h-full backdrop-blur-md flex flex-row items-center justify-center'>

                <div className='w-[20em] md:w-[25em]  h-[28em] flex items-center justify-center bg-gray-200 shadow-lg shadow-gray-500 rounded-2xl'>

                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
