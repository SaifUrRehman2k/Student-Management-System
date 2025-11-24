import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import StatsGrid from "../../Components/StatsGrid";
import Dashboard from "./Dashboard";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { getAllTeachers } from "../../redux/teachersSlice";

const AdminPortal = (props) => {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'))  
    const [open, setOpen] = useState(false);

    const [numOfStudents, setNumOfStudents] = useState(0)
    const [numOfTeachers, setNumOfTeachers] = useState(0)


    const teachersData = useSelector((state) => state.teachersData.data)
    const dispatch = useDispatch()

    useEffect(() => {
        const getData = async () => {
            const userSnap = await getDocs(collection(db, 'users'))
            let teachersCount = 0;
            let studentsCount = 0;
            
            userSnap.forEach((doc)=> {
                const user = doc.data()
                if (user.role === 'teacher') {
                    teachersCount++
                } else if (user.role === 'student'){
                    studentsCount++
                }
            })
            
            setNumOfTeachers(teachersCount)
            setNumOfStudents(studentsCount)
        }

        getData()
    }, [])

    // console.log(`numOfStudents: ${numOfStudents} & numOfTeachers: ${numOfTeachers}`);
    

    const stats = [
        { title: "Total Students", value: numOfStudents, change: "+12%", icon: "👨‍🎓", color: "blue" },
        { title: "Total Teachers", value: numOfTeachers, change: "+5%", icon: "👩‍🏫", color: "green" },
        { title: "Courses", value: "124", change: "+8%", icon: "📚", color: "purple" },
        { title: "Revenue", value: "$12,456", change: "+15%", icon: "💰", color: "orange" },
    ];

    console.log(props.currentUser);

    return (
        <div className="flex min-h-screen h-[100vh] lg:ml-64">
            <Sidebar userType="admin" isOpen={open} setIsOpen={setOpen} />

            <div className="flex-1 h-full flex flex-col">
                <Header userName={props.currentUser.first_name} title="Admin Dashboard" onMenuClick={() => setOpen(true)} userType="admin" />

                <main className="p-6 min-h-full max-w-7xl mx-auto w-full bg-gray-200">
                    <StatsGrid stats={stats} />

                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminPortal;

