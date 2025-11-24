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
import { removeToast } from "./redux/toastSlice";
import Toast from "./Components/Toast";
import Details from "./Pages/Student/Details";
import Spinner from "./Components/Spinner"
import AdminPortal from "./Pages/AdminDashboard";
import AdminDashBoard from "./Pages/AdminDashboard/Dashboard";
import Students from "./Pages/AdminDashboard/Students";
import Teachers from "./Pages/AdminDashboard/Teachers";
import Courses from "./Pages/AdminDashboard/Courses"
import Modal from "./Components/Modal";
import Button, { ButtonGroup } from "./Components/Button";
import { hideModal } from "./redux/modalSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

// const ProtectedRoute = ({ children, role }) => {
//   const { isAuthenticated, userType } = useSelector((state) => state.auth);

//   if (!isAuthenticated) return <Navigate to="/login" replace />;
//   if (role && userType !== role) return <Navigate to={`/${userType}`} replace />;

//   return children;
// };



export default function App() {
  // const { isAuthenticated, userType } = useSelector((state) => state.auth);
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is still signed in:", user);
        if (!currentUser) {
          navigate('/')
        } else {

          setUser(currentUser)
          switch (currentUser.role) {
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
      } else {
        // User is signed out
        console.log("User is signed out");
      }
    });


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
            <h1 className="text-[2em] font-[700]">Are you Sure?</h1>
            <p className="flex flex-col text-[1.6em]">
              You want to delete the user?
              <small className="text-[0.6em] text-gray-600">
                The User will be deleted forever from the database & Auth.
              </small>
            </p>
            <div className="w-[100%] flex flex-row flex-nowrap justify-between">
              <Button title="Delete" classFromParent="w-[48%] h-[2em] bg-red-800 text-gray-100 " />
              <Button title="Cancel" btnFucntiion={() => {
                dispatch(hideModal())
              }} classFromParent="w-[48%] h-[2em] bg-red-200 text-gray-800 " />
            </div>

          </Modal>
        )
      }
      {
        showModal && modalName === 'profileModal' && (
          <Modal>
            <h1 className="text-[2em] font-[700]">Your Profile</h1>

            <div className="flex flex-row items-center w-full justify-between">
              <div className="w-[30%] aspect-square bg-gradient-to-br from-blue-700 to-blue-300 rounded-full flex items-center justify-center text-white font-semibold">
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
              </div>
            </div>
            <ButtonGroup btn1Class={'bg-blue-500 text-gray-100'} btn2Class={'border-[2px] border-blue-500 text-gray-800'} title1='Edit' title2='Close' btn2Fucntiion={() => dispatch(hideModal())} />
          </Modal>
        )
      }
      {
        showModal && modalName === 'denialModal' && (
          <Modal>
            <h1 className="text-[2em] font-[700]">Access Denied</h1>
            <p className="flex flex-col text-[1.6em]">
              You are not an Authorized ADMIN.
              <small className="text-[0.6em] text-gray-600">
                 Please wait for other admins to verifyyour account
              </small>
            </p>
            <Button title='Cancel' classFromParent='bg-blue-600 text-gray-100' btnFucntiion={() => dispatch(hideModal())} />
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




