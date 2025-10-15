import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "./Pages/AdminDashboard";
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

// const ProtectedRoute = ({ children, role }) => {
//   const { isAuthenticated, userType } = useSelector((state) => state.auth);

//   if (!isAuthenticated) return <Navigate to="/login" replace />;
//   if (role && userType !== role) return <Navigate to={`/${userType}`} replace />;

//   return children;
// };



export default function App() {
  // const { isAuthenticated, userType } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useSelector(state => state.toast.value)

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dispatch(removeToast());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser) {
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
      // navigate('/admin')
    } else {
      navigate('/')
    }

  }, [])
  return (
    <>

      {
        toast && <Toast>{toast}</Toast>
      }

      <Routes>
        <Route path="/" element={<LoginPage />}>
          <Route index element={<LoginForm />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route
          path="/admin/*"
          element={
            <AdminDashboard />
          }
        />
        <Route
          path="/teacher/*"
          element={
            <TeacherDashboard />
          }
        />

        <Route path="/student" element={<StudentPage />}>
          <Route path="" element={<Dashboard />} />
          <Route path="analyctics" element={<Analyctics />} />
          <Route path="details" element={<Details/>} />
          <Route path="events" element={<Events />} />
        </Route>

      </Routes>
    </>
  )
}




