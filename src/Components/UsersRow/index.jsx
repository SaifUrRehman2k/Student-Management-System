import React from 'react'
import { useDispatch } from 'react-redux'
import { showModal } from '../../redux/modalSlice'

const UsersRow = (props) => {
    const dispatch = useDispatch()
    return (
        <div className='flex flex-row items-start flex-nowrap justify-between gap-6 w-full px-3 py-5 shadow-[3px_3px_9px] rounded-2xl shadow-gray-300 bg-gray-100'>
            <h1 className='w-[20%] text-[1em] font-[600]'>{`${props.user.first_name} ${props.user.last_name}`}</h1>
            <p className='w-[25%] text-[1em] font-[400]'>{props.user.email}</p>
            <small className='w-[30%] text-[0.9em] font-[400]'>{props.user.uid}</small>
            {
                !props.user.verified ?
                    <p className='w-[15%] flex flex-row flex-nowrap justify-between items-center text-red-600 text-[0.9em] font-[500]'>
                        Not Verified

                        <svg onClick={props.verifyAUser} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="32px" className='fill-green-600 hover:cursor-pointer hover:fill-green-400'><path d="M702-480 560-622l57-56 85 85 170-170 56 57-226 226Zm-342 0q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z" /></svg>

                    </p>
                    :
                    <p className='w-[15%] flex flex-row flex-nowrap justify-between items-center text-green-700 text-[0.9em] font-[500]'>
                        Verified

                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="32px" className='fill-red-500'><path d="m696-440-56-56 83-84-83-83 56-57 84 84 83-84 57 57-84 83 84 84-57 56-83-83-84 83Zm-336-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z" /></svg>

                    </p>
            }
            <div className='flex flex-row flex-nowrap justify-between w-[7%] h-full'>
                <svg onClick={() => {
                    dispatch(showModal('deleteModal'))
                }} xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" className='fill-gray-800 hover:cursor-pointer hover:fill-gray-600'><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                {/* <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" className='fill-gray-800 hover:cursor-pointer hover:fill-gray-600'><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg> */}

            </div>
        </div>
    )
}

export default UsersRow
