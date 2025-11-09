import React from 'react'
import Charts from "../../../Amcharts";

const AdminDashBoard = () => {
  return (
    <>
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
    </>
  )
}

export default AdminDashBoard