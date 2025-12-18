import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TeacherDashboard from "./Pages/TeacherDashboard";
import StudentPage from "./Pages/Student";
import Dashboard from "./Pages/Student/Dashboard";
import Analyctics from "./Pages/Student/Analyctics";
import Events from "./Pages/Student/Events";
import LoginPage from "./Pages/LoginPage";
import SignUp from "./Components/Signup";
import LoginForm from "./Components/Login";
import { createToast, removeToast } from "./redux/toastSlice";
import Toast from "./Components/Toast";
import Details from "./Pages/Student/Details";
import Spinner from "./Components/Spinner"
import AdminPortal from "./Pages/AdminDashboard";
import AdminDashBoard from "./Pages/AdminDashboard/Dashboard";
import Students from "./Pages/AdminDashboard/Students";
import Teachers from "./Pages/AdminDashboard/Teachers";
import Courses from "./Pages/AdminDashboard/Courses"
import Modal, { DeleteModal, DenialModal, ProfileModal } from "./Components/Modals";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import UserInfo from "./Components/UserInfo";
import { getDoc } from "firebase/firestore";


export default function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useSelector(state => state.toast.value)
  const loadingState = useSelector(state => state.loader.value)
  const showModal = useSelector(state => state.modal.display)
  const modalName = useSelector(state => state.modal.modalName)

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dispatch(removeToast());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const checkRole = (userRole) => {
    switch (userRole) {
      case 'admin':
        navigate('/admin');
        break;
      case 'teacher':
        navigate('/teacher');
        break;
      case 'student':
        navigate('/student');
        break;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        console.log("User is still signed in:", user);
        if (currentUser) {
          setUser(currentUser)
          checkRole(currentUser.role)
          
        } else {
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data()
            localStorage.setItem('currentUser', JSON.stringify(userData));
            setUser(userData);
            checkRole(userData.role)

          } else {
            dispatch(createToast('No user Foun. Signing out!'))
            signOut(auth);
          }

        }
      } else {
        console.log("User is signed out");
        dispatch(createToast('No user Signed In'))
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [])


  return (
    <>

      {
        toast && <Toast>{toast}</Toast>
      }
      {
        loadingState && <Spinner />
      }
      {
        showModal && modalName === 'deleteModal' && (
          <Modal>
            <DeleteModal user={user} />
          </Modal>
        )
      }
      {
        showModal && modalName === 'profileModal' && (
          <Modal>
            <ProfileModal user={user} />
          </Modal>
        )
      }
      {
        showModal && modalName === 'denialModal' && (
          <Modal>
            <DenialModal/>
          </Modal>
        )
      }




      <Routes>
        <Route path="/" element={<LoginPage />}>
          <Route index element={<LoginForm />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route path="/admin" element={<AdminPortal currentUser={currentUser} />}>
          <Route path="" element={<AdminDashBoard />} />
          <Route path="students" element={<Students />} />
          <Route path="user/:uid" element={<UserInfo/>} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="courses" element={<Courses />} />
        </Route>
        <Route
          path="/teacher/*"
          element={
            <TeacherDashboard />
          }
        />

        <Route path="/student" element={<StudentPage />}>
          <Route path="" element={<Dashboard />} />
          <Route path="analyctics" element={<Analyctics />} />
          <Route path="details" element={<Details />} />
          <Route path="events" element={<Events />} />
        </Route>

      </Routes>
    </>
  )
}




