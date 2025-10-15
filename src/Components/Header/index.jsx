import React from "react";

const Header = ({ title, onMenuClick, userType }) => {
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

                    <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold">
                            {userType === "admin" ? "A" : "T"}
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-800">
                                {userType === "admin" ? "Admin User" : "Teacher User"}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">{userType}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;




