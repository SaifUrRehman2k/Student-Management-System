import React from 'react'
import { ButtonGroup } from '../Button'
import { useDispatch } from 'react-redux'
import { hideModal } from '../../redux/modalSlice'



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

export const DeleteModal = ({ item }) => {
    const dispatch = useDispatch()
    return (
        <>
            <h1 className="text-[2em] font-[700]">Are you Sure?</h1>
            <p className="flex flex-col text-[1.6em]">
                You want to delete the {item}?
                <small className="text-[0.6em] text-gray-600">
                    The {item} will be deleted forever from the database & Auth.
                </small>
            </p>

            <ButtonGroup btn1Class={'bg-red-500 text-gray-100'} btn2Class={'border-[2px] border-red-500 text-gray-800'} title1='Edit' title2='Close' btn2Fucntiion={() => dispatch(hideModal())} />
        </>
    )
}

export const ProfileModal = ({ user }) => {
    const dispatch = useDispatch()

    return (
        <>
            <h1 className="text-[2em] font-[700]">Your Profile</h1>

            <div className="flex flex-row items-center w-full justify-between">
                <div className="w-[30%] aspect-square bg-gradient-to-br from-blue-700 to-blue-300 rounded-full flex items-center justify-center text-white font-semibold">
                    <h1 className="text-6xl">{user?.first_name?.charAt(0)}</h1>
                </div>

                <div className="flex flex-col flex-wrap items-start w-[60%]">
                    <div className="w-full flex flex-row flex-nowrap justify-between items-center border-b-[1px] border-gray-300 py-2">
                        <h1 className="text-[1.3em] font-[500]">Name</h1>
                        <small className="text-[1.2em] font-[400]">{`${user?.first_name} ${user?.last_name}`}</small>
                    </div>
                    <div className="w-full flex flex-row flex-nowrap justify-between items-center border-b-[1px] border-gray-300 py-2">
                        <h1 className="text-[1.3em] font-[500]">Email</h1>
                        <small className="text-[1.2em] font-[400]">{user?.email}</small>
                    </div>
                    <div className="w-full flex flex-row flex-nowrap justify-between items-center border-b-[1px] border-gray-300 py-2">
                        <h1 className="text-[1.3em] font-[500]">Password</h1>
                        <small className="text-[1.2em] font-[400]">{user?.password}</small>
                    </div>
                </div>
            </div>
            <ButtonGroup btn1Class={'bg-blue-500 text-gray-100'} btn2Class={'border-[2px] border-blue-500 text-gray-800'} title1='Edit' title2='Close' btn2Fucntiion={() => dispatch(hideModal())} />
        </>
    )
}


export const DenialModal = () => {
    return (
        <>
            <h1 className="text-[2em] font-[700]">Access Denied</h1>
            <p className="flex flex-col text-[1.6em]">
                You are not an Authorized ADMIN.
                <small className="text-[0.6em] text-gray-600">
                    Please wait for other admins to verifyyour account
                </small>
            </p>
            <ButtonGroup btn1Class={'bg-blue-500 text-gray-100'} btn2Class={'border-[2px] border-blue-500 text-gray-800'} title1='Edit' title2='Close' btn2Fucntiion={() => dispatch(hideModal())} />

        </>
    )
}




export default Modal
