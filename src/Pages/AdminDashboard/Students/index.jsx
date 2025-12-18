import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { auth, db } from '../../../firebase'
import { collection, doc, getDoc, getDocs, runTransaction } from 'firebase/firestore'
import Spinner from '../../../Components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStudents } from '../../../redux/studentsSlice'
import Modal from '../../../Components/Modals'
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

  return (
    <>
      <h1 className='text-gray-800 sm:text-[2em] text-[1.4em] font-[500] my-5'>Students</h1>
      <div className="flex flex-col flex-nowrap gap-6 mt-6 h-[40em]">
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
        </div>


        <div className='text-black flex flex-row md:flex-col flex-wrap items-center gap-4 w-full'>
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
