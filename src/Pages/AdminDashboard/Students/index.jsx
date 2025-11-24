import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../../../firebase'
import { collection, doc, getDoc, getDocs, runTransaction } from 'firebase/firestore'
import Spinner from '../../../Components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStudents } from '../../../redux/studentsSlice'
import Modal from '../../../Components/Modal'
import { hideModal, showModal } from '../../../redux/modalSlice'
import Button, { ButtonGroup } from '../../../Components/Button'
import { onAuthStateChanged } from 'firebase/auth'

const Students = () => {
  const studentsData = useSelector((state) => state.studentsData.data)
  const modalName = useSelector(state => state.modal.modalName)
  const dispatch = useDispatch()

  const [displayUsers, setDisplayUsers] = useState('all')

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      console.log("User is still signed in:", user);
    } else {
      // User is signed out
      console.log("User is signed out");
    }
  });


  useEffect(() => {
    const getData = async () => {
      const userSnap = await getDocs(collection(db, 'users'))
      const fetchedStudents = []

      userSnap.forEach((doc) => {
        const user = doc.data()

        if (user.role === 'student') {
          console.log(`Student:`, doc.data());
          fetchedStudents.push(user)

        }
      })
      dispatch(getAllStudents(fetchedStudents))
    }

    getData()
  }, [])

  const verifyUser = async (uid) => {
    const userRef = doc(db, 'users', uid)

    try {
      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRef)

        if (!userDoc.exists()) {
          console.log('Doc doesnt exist ');
          return;
        }

        transaction.update(userRef, { verified: true })
      })

      console.log('userVerified successfully');

    } catch (error) {
      console.log(`transaction failed: ${error}`);

    }
  }

  const checkIsVerified = () => {
    const verifiedUsers = studentsData.filter(user => user.isVerified);
    console.log('Varified users :', verifiedUsers);

  }

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
      {
        showModal && modalName === 'userInfoModal' && (
          <Modal>
            <h1 className="text-[2em] font-[700]">Your Profile</h1>

            <div className="flex flex-row items-center w-full justify-between">
              {/* <div className="w-[30%] aspect-square bg-gradient-to-br from-blue-700 to-blue-300 rounded-full flex items-center justify-center text-white font-semibold">
                <h1 className="text-6xl">{user.first_name.charAt(0)}</h1>
              </div>

              <div className="flex flex-col flex-wrap items-start w-[60%]">
                <div className="w-full flex flex-row flex-nowrap justify-between items-center border-b-[1px] border-gray-300 py-2">
                  <h1 className="text-[1.3em] font-[500]">Name</h1>
                  <small className="text-[1.2em] font-[400]">{`${user.first_name} ${user.last_name}`}</small>
                </div>
                <div className="w-full flex flex-row flex-nowrap justify-between items-center border-b-[1px] border-gray-300 py-2">
                  <h1 className="text-[1.3em] font-[500]">Email</h1>
                  <small className="text-[1.2em] font-[400]">{user.email}</small>
                </div>
                <div className="w-full flex flex-row flex-nowrap justify-between items-center border-b-[1px] border-gray-300 py-2">
                  <h1 className="text-[1.3em] font-[500]">Password</h1>
                  <small className="text-[1.2em] font-[400]">{user.password}</small>
                </div>
              </div> */}
              <h1>Hellow</h1>

            </div>

            <ButtonGroup btn1Class={'bg-blue-500 text-gray-100'} btn2Class={'border-[2px] border-blue-500 text-gray-800'} title1='Edit' title2='Close' btn2Fucntiion={() => dispatch(hideModal())} />

          </Modal>
        )
      }
      <div className="flex flex-col flex-wrap gap-6 mt-6 h-[40em]">
        <div className='flex flex-row items-center flex-nowrap gap-4'>
          <h2 onClick={()=> setDisplayUsers('all')} className='text-gray-800 text-2xl'>
            <Link>All</Link>
          </h2>
          <h2 onClick={() => setDisplayUsers('verified')} className='text-gray-800 text-2xl hover:cursor-pointer'>
            Verified
          </h2>
          <h2 className='text-gray-800 text-2xl'>
            <Link>Not verified</Link>
          </h2>
          <h2 className='text-gray-800 text-2xl'>
            <Link>Recent</Link>
          </h2>
          {/* <button className='bg-amber-900 text-white' >Get</button> */}
        </div>


        <div className='text-black flex flex-col flex-wrap items-center gap-4'>
          {
            displayUsers === 'all' && studentsData && studentsData.map((user, index) => (
              <div key={index} className='flex flex-row items-start flex-nowrap justify-between hover:cursor-pointer gap-6 w-full px-3 py-5 shadow-[3px_3px_9px] rounded-2xl shadow-gray-300 bg-gray-100'>
                <h1 className='w-[20%] text-[1em] font-[600]'>{`${user.first_name} ${user.last_name}`}</h1>
                <p className='w-[25%] text-[1em] font-[400]'>{user.email}</p>
                <small className='w-[30%] text-[0.9em] font-[400]'>{user.uid}</small>
                {
                  !user.verified ?
                    <p className='w-[15%] flex flex-row flex-nowrap justify-between items-center text-red-600 text-[0.9em] font-[500]'>
                      Not Verified

                      <svg onClick={()=>verifyUser(user.uid)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="32px" className='fill-green-600'><path d="M702-480 560-622l57-56 85 85 170-170 56 57-226 226Zm-342 0q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z" /></svg>

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
            )) 
          }
          {
            displayUsers === 'verified' && studentsData && studentsData.filter(user => user.isVerified).map((user, index) => (
              <div key={index} className='flex flex-row items-start flex-nowrap justify-between hover:cursor-pointer gap-6 w-full px-3 py-5 shadow-[3px_3px_9px] rounded-2xl shadow-gray-300 bg-gray-100'>
                <h1 className='w-[20%] text-[1em] font-[600]'>{`${user.first_name} ${user.last_name}`}</h1>
                <p className='w-[25%] text-[1em] font-[400]'>{user.email}</p>
                <small className='w-[30%] text-[0.9em] font-[400]'>{user.uid}</small>
                {
                  !user.verified ?
                    <p className='w-[15%] flex flex-row flex-nowrap justify-between items-center text-red-600 text-[0.9em] font-[500]'>
                      Not Verified

                      <svg onClick={()=>verifyUser(user.uid)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="32px" className='fill-green-600'><path d="M702-480 560-622l57-56 85 85 170-170 56 57-226 226Zm-342 0q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z" /></svg>

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
            )) 
          }
        </div>
      </div>
    </>
  )
}

export default Students
