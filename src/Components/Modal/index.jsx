import React from 'react'


const Modal = ({ children }) => {
    return (
        <div className='fixed inset-0 z-[999] flex items-center justify-center'>
            <div className='absolute inset-0 bg-gray-700 opacity-40'></div>

            <div className='relative z-10 w-[30em] h-max flex flex-col flex-nowrap gap-8 rounded-2xl bg-white p-6 text-gray-800'>
                {children}
            </div>
        </div>
    )
}


export default Modal
