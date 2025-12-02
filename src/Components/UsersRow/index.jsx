import React from 'react'
import { useDispatch } from 'react-redux'
import { showModal } from '../../redux/modalSlice'
import { Link, useParams } from 'react-router-dom'

const UsersRow = (props) => {
    const dispatch = useDispatch()

    return (
        <div className='flex flex-column md:flex-row items-start flex-wrap md:flex-nowrap justify-between gap-6 w-[45%] md:w-full px-3 py-5 shadow-[3px_3px_9px] rounded-2xl shadow-gray-300 bg-gray-100'>
            <h1 className='w-full md:w-[20%] text-[1.4em] md:text-[1em] font-[600]'>{`${props.user.first_name} ${props.user.last_name}`}</h1>
            <p className='hidden md:w-[25%] text-[1em] font-[400]'>{props.user.email}</p>
            <small className='w-full md:w-[50%] lg:w-[30%] text-[0.9em] font-[400]'>{props.user.uid}</small>
            {
                !props.user.verified ?
                    <p className='sm:w-[30&] md:w-[15%] flex flex-row flex-nowrap justify-between items-center text-red-600 text-[0.9em] font-[500]'>
                        Not Verified

                        <svg onClick={props.verifyAUser} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="32px" className='fill-green-600 hover:cursor-pointer hover:fill-green-400'><path d="M702-480 560-622l57-56 85 85 170-170 56 57-226 226Zm-342 0q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z" /></svg>

                    </p>
                    :
                    <p className='w-[30%] md:w-[15%] flex flex-row flex-nowrap justify-between items-center text-green-700 text-[0.9em] font-[500]'>
                        Verified

                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="32px" className='fill-red-500'><path d="m696-440-56-56 83-84-83-83 56-57 84 84 83-84 57 57-84 83 84 84-57 56-83-83-84 83Zm-336-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z" /></svg>

                    </p>
            }
            <div className='flex flex-row flex-nowrap justify-around sm:w-[30%] md:w-[7%] h-full'>
                <svg onClick={() => {
                    dispatch(showModal('deleteModal'))
                }} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" className='fill-gray-800 hover:cursor-pointer hover:fill-gray-600'><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                {/* <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" className='fill-gray-800 hover:cursor-pointer hover:fill-gray-600'><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg> */}

                <Link to={`/admin/user/${props.user.uid}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" className='fill-gray-800 hover:cursor-pointer hover:fill-gray-600' ><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                </Link>
            </div>
        </div>
    )
}

export default UsersRow
