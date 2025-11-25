import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { auth, db } from '../../../firebase'
import { collection, doc, getDoc, getDocs, runTransaction } from 'firebase/firestore'
import Spinner from '../../../Components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStudents } from '../../../redux/studentsSlice'
import Modal from '../../../Components/Modal'
import { hideModal, showModal } from '../../../redux/modalSlice'
import Button, { ButtonGroup } from '../../../Components/Button'
import { onAuthStateChanged } from 'firebase/auth'
import { createToast } from '../../../redux/toastSlice'
import UsersRow from '../../../Components/UsersRow'

const Students = () => {
  let [updatestate, setupdateState] = useState(0)
  const studentsData = useSelector((state) => state.studentsData.data)
  const modalName = useSelector(state => state.modal.modalName)
  const dispatch = useDispatch()

  const [displayUsers, setDisplayUsers] = useState('all')

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
  }, [updatestate])

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
        setupdateState(++updatestate)
        dispatch(createToast('User Verified'))
      })

      console.log('userVerified successfully');

    } catch (error) {
      console.log(`transaction failed: ${error}`);

    }
  }

  const checkIsVerified = () => {
    const verifiedUsers = studentsData?.filter(user => user?.verified);
    console.log('Varified users :', verifiedUsers);

  }

  checkIsVerified()
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
          <h2 onClick={() => {
            setDisplayUsers('all')
            updateActiveNav('all')
          }} className={`text-gray-800 text-2xl ${displayUsers === 'all' ? 'underline' : undefined}`}>
            <NavLink>All</NavLink>
          </h2>
          <h2 onClick={() => {
            setDisplayUsers('verified')
            updateActiveNav('verified')
          }} className={`text-gray-800 text-2xl ${displayUsers === 'verified' ? 'underline' : undefined}`}>
            <NavLink>Verified</NavLink>
          </h2>
          <h2 onClick={() => {
            setDisplayUsers('unverified')
            updateActiveNav('unverified')
          }} className={`text-gray-800 text-2xl ${displayUsers === 'unverified' ? 'underline' : undefined}`}>
            <Link>Not verified</Link>
          </h2>
          <h2 onClick={() => {
            setDisplayUsers('recent')
            updateActiveNav('recent')
          }} className={`text-gray-800 text-2xl ${displayUsers === 'recent' ? 'underline' : undefined}`}>
            <Link>Recent</Link>
          </h2>
          {/* <button className='bg-amber-900 text-white' >Get</button> */}
        </div>


        <div className='text-black flex flex-col flex-wrap items-center gap-4'>
          {
            displayUsers === "all" && studentsData && studentsData.map((user, index) => (
              <UsersRow key={user.uid} verifyAUser={() => verifyUser(user.uid)} user={user} />
            ))

          }
          {
            displayUsers === "verified" && studentsData && studentsData.filter(user => user.verified).map((user, index) => (
              <UsersRow key={user.uid} verifyAUser={() => verifyUser(user.uid)} user={user} />
            ))
          }
          {
            displayUsers === "unverified" && studentsData && studentsData.filter(user => !user.verified).map((user, index) => (
              <UsersRow key={user.uid} verifyAUser={() => verifyUser(user.uid)} user={user} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Students
