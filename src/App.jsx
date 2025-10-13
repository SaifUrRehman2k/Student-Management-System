import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminDashboard from "./Pages/AdminDashboard";
import TeacherDashboard from "./Pages/TeacherDashboard";

import StudentPage from "./Pages/Student";
import Dashboard from "./Pages/Student/Dashboard";
import Analyctics from "./Pages/Student/Analyctics";
import Class from "./Pages/Student/Class";
import Events from "./Pages/Student/Events";
import LoginPage from "./Pages/LoginPage";
import SignUp from "./Components/Signup";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, userType } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && userType !== role) return <Navigate to={`/${userType}`} replace />;

  return children;
};

export default function App() {
  const { isAuthenticated, userType } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <LoginPage />
          ) : (
            <Navigate to={`/${userType}`} replace />
          )
        }
      />
      <Route path="/sign-up" element={<SignUp />} />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/*"
        element={
          <ProtectedRoute role="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/*"
        element={
          <ProtectedRoute role="student">
            <StudentPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="analyctics" element={<Analyctics />} />
        <Route path="classes" element={<Class />} />
        <Route path="events" element={<Events />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}




