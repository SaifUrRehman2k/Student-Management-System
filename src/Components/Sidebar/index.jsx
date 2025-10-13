import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const Sidebar = ({ userType = "admin", isOpen = false, setIsOpen = () => { } }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const adminMenu = [
        { name: "Dashboard", icon: "📊", path: "/admin" },
        { name: "Students", icon: "👨‍🎓", path: "/admin/students" },
        { name: "Teachers", icon: "👩‍🏫", path: "/admin/teachers" },
        { name: "Courses", icon: "📚", path: "/admin/courses" },
        { name: "Analytics", icon: "📈", path: "/admin/analytics" },
        { name: "Settings", icon: "⚙️", path: "/admin/settings" },
    ];

    const teacherMenu = [
        { name: "Dashboard", icon: "📊", path: "/teacher" },
        { name: "My Courses", icon: "📚", path: "/teacher/courses" },
        { name: "Students", icon: "👨‍🎓", path: "/teacher/students" },
        { name: "Assignments", icon: "📝", path: "/teacher/assignments" },
        { name: "Grades", icon: "🎯", path: "/teacher/grades" },
        { name: "Schedule", icon: "📅", path: "/teacher/schedule" },
    ];

    const menu = userType === "admin" ? adminMenu : teacherMenu;

    return (
        <>
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden"
                />
            )}

            <aside
                className={`fixed lg:static inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg flex flex-col">
                    <div className="flex items-center justify-between px-5 py-5 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                <span className="text-gray-900 font-bold">🎓</span>
                            </div>
                            <div>
                                <div className="font-semibold text-white">Education Portal</div>
                                <div className="text-xs text-gray-300"></div>
                            </div>
                        </div>

                        <button
                            className="lg:hidden text-white hover:text-emerald-300 smooth"
                            onClick={() => setIsOpen(false)}
                            aria-label="close sidebar"
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="flex-1 px-3 py-6 overflow-y-auto sidebar-scroll">
                        {menu.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-md mb-1 smooth ${isActive
                                        ? "bg-emerald-100 text-emerald-900 font-semibold shadow-sm"
                                        : "text-gray-200 hover:bg-emerald-600/20 hover:text-white"
                                    }`
                                }
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>

                    <div className="px-4 py-4 border-t border-gray-700">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 justify-center px-3 py-2 rounded-md text-white bg-emerald-500 hover:bg-emerald-600 smooth"
                        >
                            <span>🚪</span>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;







