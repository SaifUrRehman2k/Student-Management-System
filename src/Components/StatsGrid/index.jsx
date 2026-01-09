import React from "react";

const StatsGrid = ({ stats = [] }) => {
    const colorMap = {
        blue: "bg-emerald-50 text-emerald-600",
        green: "bg-emerald-50 text-emerald-600",
        purple: "bg-indigo-50 text-indigo-600",
        orange: "bg-amber-50 text-amber-600",
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
                <div
                    key={i}
                    className="bg-slate-100 rounded-lg shadow-soft p-4 smooth hover-glow "
                >
                    <div className="flex-col items-center justify-between h-full gap-2">
                        <div className={`w-12 h-max rounded-lg flex items-start justify-start ${colorMap[s.color] || colorMap.blue}`}>
                            <span className="w-max h-max flex self-start">{s.icon}</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{s.title}</p>
                            <p className="text-2xl font-semibold text-emerald-600 mt-1">{s.value}</p>
                            <p className={`text-sm mt-1 ${s.change.includes("+") ? "text-green-600" : "text-red-600"}`}>
                                {s.change} from last month
                            </p>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;
