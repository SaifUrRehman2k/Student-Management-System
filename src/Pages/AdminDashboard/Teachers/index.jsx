import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from '../../../Components/Modal'
import Button, { ButtonGroup } from '../../../Components/Button'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase'
import { getAllTeachers } from '../../../redux/teachersSlice'
import { showModal } from '../../../redux/modalSlice'

const Teachers = () => {
  const teachersData = useSelector((state) => state.teachersData.data)
  const dispatch = useDispatch()

  useEffect(() => {
    const getData = async () => {
      const userSnap = await getDocs(collection(db, 'users'))
      const data = []

      userSnap.forEach((doc) => {
        const user = doc.data()

        if (user.role === 'teacher') {
          console.log(`Teacher:`, doc.data());
          data.push(user)

        }
      })
      dispatch(getAllTeachers(data))
    }

    getData()
  }, [])
  console.log(teachersData);


  const userDeletionModal =
    <>
      <Modal>
        <h1 className="text-[2em] font-[700]">Are you Sure?</h1>
        <p className="flex flex-col text-[1.6em]">
          You want to delete the user?
          <small className="text-[0.6em] text-gray-600">
            The User will be deleted forever from the database & Auth.
          </small>
        </p>
        <div className="w-[100%] flex flex-row flex-nowrap justify-between">
          <Button title="Delete" classFromParent="w-[48%] h-[2em] bg-red-800 text-gray-100 " />
          <Button title="Cancel" classFromParent="w-[48%] h-[2em] bg-red-200 text-gray-800 " />
        </div>
      </Modal>

    </>

  return (
    <>
      <div className="flex flex-col flex-wrap gap-6 mt-6 h-[40em]">
        <div className='flex flex-row items-center flex-nowrap gap-4'>
          <h2 className='text-gray-800 text-2xl'>
            <Link>All</Link>
          </h2>
          <h2 className='text-gray-800 text-2xl'>
            <Link>Pending</Link>
          </h2>
          <h2 className='text-gray-800 text-2xl'>
            <Link>Recent</Link>
          </h2>
          <h2 className='text-gray-800 text-2xl'>
            <Link>Top</Link>
          </h2>
          {/* <button className='bg-amber-900 text-white' >Get</button> */}
        </div>



        <div className='text-black flex flex-col flex-wrap items-center gap-4'>
          {
            teachersData ? teachersData.map((user, index) => (
              <div key={index} className='flex flex-row items-start flex-nowrap justify-between gap-6 w-full px-4 py-2 shadow-[3px_3px_9px] rounded-2xl shadow-gray-300 bg-gray-100'>
                <h1 className='w-[20%] text-[1em] font-[600]'>{`${user.first_name} ${user.last_name}`}</h1>
                <p className='w-[40%] text-[1em] font-[400]'>{user.email}</p>
                <small className='w-[40%] text-[0.9em] font-[400]'>{user.uid}</small>
                <div className='flex flex-row flex-nowrap justify-between w-[7%] h-full'>
                  <svg onClick={() => {
                    dispatch(showModal())
                  }} xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" className='fill-gray-800 hover:cursor-pointer hover:fill-gray-600'><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" className='fill-gray-800 hover:cursor-pointer hover:fill-gray-600'><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                </div>
              </div>
            )) : <h1>Loading...</h1>

          }
        </div>

        
      </div>
    </>
  )
}

export default Teachers