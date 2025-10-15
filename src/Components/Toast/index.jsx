import React from 'react'
import { useDispatch } from 'react-redux'
import { removeToast } from '../../redux/toastSlice'

const Toast = ({ children }) => {
    const dispatch = useDispatch()
    return (
        <>
            <div className='flex flex-row items-center justify-center h-[4em] rounded-[1em] px-4 w-max absolute bottom-10 right-10 gap-8 bg-gray-800 text-gray-200 animate-slide transition-all duration-[5s] z-[900]'>
                
                {children}
                <svg onClick={()=> dispatch(removeToast())} className='hover:cursor-pointer' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>

            </div>
        </>
    )
}

export default Toast
