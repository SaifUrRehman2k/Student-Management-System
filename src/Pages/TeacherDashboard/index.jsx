import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import StatsGrid from "../../components/StatsGrid";
import Charts from "../../Amcharts";
const TeacherDashboard = () => {
    const [open, setOpen] = useState(false);

    const stats = [
        { title: "My Students", value: "156", change: "+5%", icon: "👨‍🎓", color: "blue" },
        { title: "Active Courses", value: "8", change: "+2", icon: "📚", color: "green" },
        { title: "Assignments", value: "24", change: "+3", icon: "📝", color: "purple" },
        { title: "Avg. Grade", value: "85%", change: "+2%", icon: "🎯", color: "orange" },
    ];

    return (
        <div className="flex min-h-screen">
            <Sidebar userType="teacher" isOpen={open} setIsOpen={setOpen} />

            <div className="flex-1 flex flex-col">
                <Header title="Teacher Dashboard" onMenuClick={() => setOpen(true)} userType="teacher" />

                <main className="p-6 max-w-7xl mx-auto w-full">
                    <StatsGrid stats={stats} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                        <section className="lg:col-span-2 bg-white rounded-lg shadow-soft p-5">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Performance</h3>
                            <Charts type="column" />
                        </section>

                        <section className="bg-white rounded-lg shadow-soft p-5">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Schedule</h3>
                            <div className="space-y-3">
                                {[
                                    { time: "09:00 AM", subject: "Mathematics", class: "Grade 10-A" },
                                    { time: "11:00 AM", subject: "Physics", class: "Grade 11-B" },
                                    { time: "02:00 PM", subject: "Computer Science", class: "Grade 12-A" },
                                ].map((s, i) => (
                                    <div key={i} className="p-3 border-l-4 border-emerald-200 bg-emerald-50 rounded">
                                        <p className="font-medium text-gray-800">{s.time}</p>
                                        <p className="text-gray-600">{s.subject}</p>
                                        <p className="text-sm text-gray-500">{s.class}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="bg-white rounded-lg shadow-soft p-5 mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Submissions</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 text-gray-600 font-medium">Student</th>
                                        <th className="text-left py-3 text-gray-600 font-medium">Assignment</th>
                                        <th className="text-left py-3 text-gray-600 font-medium">Submitted</th>
                                        <th className="text-left py-3 text-gray-600 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { student: "Alice Johnson", assignment: "Math Homework #5", time: "2 hours ago", status: "Graded" },
                                        { student: "Bob Smith", assignment: "Physics Lab Report", time: "5 hours ago", status: "Pending" },
                                        { student: "Carol Davis", assignment: "Programming Project", time: "1 day ago", status: "Graded" },
                                    ].map((sub, idx) => (
                                        <tr key={idx} className="border-b hover:bg-gray-50">
                                            <td className="py-3">{sub.student}</td>
                                            <td className="py-3">{sub.assignment}</td>
                                            <td className="py-3 text-gray-500">{sub.time}</td>
                                            <td className="py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${sub.status === "Graded" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TeacherDashboard;


