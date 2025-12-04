import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import StatsGrid from "../../Components/StatsGrid";
import Dashboard from "./Dashboard";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { getAllTeachers } from "../../redux/teachersSlice";
import { showModal } from "../../redux/modalSlice";
import { removeUser } from "../../redux/userSlice";
import { createToast } from "../../redux/toastSlice";
import { signOut } from "firebase/auth";

const AdminPortal = (props) => {
    const [open, setOpen] = useState(false);
    const [numOfStudents, setNumOfStudents] = useState(0)
    const [numOfTeachers, setNumOfTeachers] = useState(0)

    const teachersData = useSelector((state) => state.teachersData.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(removeUser())
            dispatch(createToast('Signed out Successfully'))
            navigate("/");
        }).catch((error) => {
            if (error instanceof FirebaseError) {
                const errorMsg = error.message.replace(/^Firebase:\s*/, '').replace(/\s*\(.*\)$/, '');
                console.log(errorMsg);
                dispatch(createToast(errorMsg));
            } else {
                dispatch(createToast(`Unexpected error: ${error}`));
            }
        })
    };

    useEffect(() => {
        if (props.currentUser && !props.currentUser?.verified) {
            console.log(props.currentUser?.verified);
            handleLogout()
            dispatch(showModal('denialModal'))
        }
    }, [props.currentUser]);

    useEffect(() => {
        const getData = async () => {
            const userSnap = await getDocs(collection(db, 'users'))
            let teachersCount = 0;
            let studentsCount = 0;

            userSnap.forEach((doc) => {
                const user = doc.data()
                if (user.role === 'teacher') {
                    teachersCount++
                } else if (user.role === 'student') {
                    studentsCount++
                }
            })

            setNumOfTeachers(teachersCount)
            setNumOfStudents(studentsCount)
        }

        getData()
    }, [])



    const stats = [
        { title: "Total Students", value: numOfStudents, change: "+12%", icon: "👨‍🎓", color: "blue" },
        { title: "Total Teachers", value: numOfTeachers, change: "+5%", icon: "👩‍🏫", color: "green" },
        { title: "Courses", value: "124", change: "+8%", icon: "📚", color: "purple" },
        { title: "Revenue", value: "$12,456", change: "+15%", icon: "💰", color: "orange" },
    ];


    return (
        <div className="flex min-h-[100vh] h-full lg:ml-64">
            <Sidebar userType="admin" isOpen={open} setIsOpen={setOpen} />

            <div className="flex-1 h-full flex flex-col">
                <Header userName={props.currentUser.first_name} title="Admin Dashboard" onMenuClick={() => setOpen(true)} userType="admin" />

                <main className="p-6 min-h-[100vh] h-max md:h-full max-w-7xl mx-auto w-full bg-gray-200">
                    <StatsGrid stats={stats} />

                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminPortal;

