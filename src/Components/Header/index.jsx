import React from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/modalSlice";

const Header = ({ title, onMenuClick, userType, userName }) => {
    const dispatch = useDispatch()
    return (
        <header className="bg-gray-200 border-b border-gray-100 shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden text-gray-500 hover:text-emerald-600 p-2 smooth"
                        aria-label="open menu"
                    >
                        ☰
                    </button>
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
                        {title}
                    </h1>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-500 hover:text-emerald-600 relative smooth" aria-label="notifications">
                        🔔
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    <div className="flex items-center space-x-3 hover:cursor-pointer" onClick={()=> dispatch(showModal('profileModal'))}>
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-700 to-blue-300 rounded-full flex items-center justify-center text-white font-semibold">
                            {userName.charAt(0)}
                        </div>
                        <div className="text-right ">
                            <h1 className="text-[1em] font-medium text-gray-800 leading-[12px]">
                                {userName}
                            </h1>
                            <p className="text-xs text-gray-500 capitalize">{userType}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;




