import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import StatsGrid from "../../Components/StatsGrid";
import Charts from "../../Amcharts";

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);

    const stats = [
        { title: "Total Students", value: "2,456", change: "+12%", icon: "👨‍🎓", color: "blue" },
        { title: "Total Teachers", value: "48", change: "+5%", icon: "👩‍🏫", color: "green" },
        { title: "Courses", value: "124", change: "+8%", icon: "📚", color: "purple" },
        { title: "Revenue", value: "$12,456", change: "+15%", icon: "💰", color: "orange" },
    ];

    return (
        <div className="flex min-h-screen">
            <Sidebar userType="admin" isOpen={open} setIsOpen={setOpen} />

            <div className="flex-1 flex flex-col">
                <Header title="Admin Dashboard" onMenuClick={() => setOpen(true)} userType="admin" />

                <main className="p-6 max-w-7xl mx-auto w-full bg-gray-200">
                    <StatsGrid stats={stats} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                        <section className="col-span-2 bg-gray-100 rounded-lg shadow-soft p-5">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Enrollment</h3>
                            <Charts type="line" />
                        </section>

                        <section className="bg-gray-100 rounded-lg shadow-soft p-5">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Distribution</h3>
                            <Charts type="pie" />
                        </section>
                    </div>

                    {/* <div className="bg-gray-100 rounded-lg shadow-soft p-5 mt-6 h-[30em] overflow-x-hidden">
                        <div className="w-full h-[90%] flex flex-col flex-wrap gap-5">
                            <div className="w-full h-10 border">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Users</h3>

                            </div>
                            <div className="w-full h-10 border border-gray-900">

                            </div>

                            <div className="w-full h-10 border border-gray-900">

                            </div>

                            <div className="w-full h-10 border border-gray-900">

                            </div>

                            <div className="w-full h-10 border border-gray-900">

                            </div>

                        </div>
                    </div> */}

                    <div className="bg-gray-100 rounded-lg shadow-soft p-5 mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {[
                                { user: "John Doe", action: "enrolled in Web Development", time: "2 min ago" },
                                { user: "Sarah Wilson", action: "completed Python Course", time: "1 hour ago" },
                                { user: "Mike Johnson", action: "submitted assignment", time: "3 hours ago" },
                            ].map((a, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-md hover:bg-gray-50 smooth">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold">
                                        {a.user[0]}
                                    </div>
                                    <div>
                                        <p className="text-gray-800"><strong>{a.user}</strong> {a.action}</p>
                                        <p className="text-xs text-gray-500">{a.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;

