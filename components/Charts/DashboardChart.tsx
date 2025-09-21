"use client";

import React, { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

interface DataItem {
    month: string;
    approved: number;
    rejected: number;
}

const barData: DataItem[] = [
    { month: "01/24", approved: 15, rejected: 10 },
    { month: "02/24", approved: 12, rejected: 13 },
    { month: "03/24", approved: 10, rejected: 15 },
    { month: "04/24", approved: 37, rejected: 20 },
    { month: "05/24", approved: 15, rejected: 10 },
    { month: "06/24", approved: 12, rejected: 13 },
    { month: "07/24", approved: 15, rejected: 10 },
    { month: "08/24", approved: 12, rejected: 13 },
    { month: "09/24", approved: 15, rejected: 10 },
    { month: "10/24", approved: 12, rejected: 13 },
    { month: "11/24", approved: 15, rejected: 10 },
    { month: "12/24", approved: 12, rejected: 13 },
];

const pieData = [
    { name: "אושרו", value: 214897, color: "#648AA3" },
    { name: "נדחו", value: 214897, color: "#DACF61" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const total = payload.reduce((acc: number, cur: any) => acc + cur.value, 0);
        return (
            <div className="bg-white shadow-lg rounded-lg px-2 py-1 border border-gray-200 md:w-[150px] w-max" style={{ boxShadow: "0px 2px 30px 2px #99BF4129" }}>
                <p className="font-semibold text-gray-800">{label}</p>
                {label ? (
                    <p className="text-[#59687D] font-medium text-base border-b border-[#59687D]">סה"כ {total.toLocaleString()}</p>
                ) : (
                    ""
                )
                }
                {payload.map((entry: any, index: number) => (
                    <div
                        key={`item-${index}`}
                        className="text-base font-medium flex space-y-2"
                        style={{ color: entry.color }}
                    >
                        <div
                            className="w-2 h-2 rounded-full ml-2 mt-3"
                            style={{ backgroundColor: entry.color }}
                        ></div>
                        <span className="flex flex-col text-[#59687D] text-sm leading-4 font-normal">
                            {entry.name} <span className="font-semibold text-sm">{entry.value}</span>
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const CustomLegend = ({ payload, onClick, hiddenKeys }: any) => {
    return (
        <div className="flex gap-4 justify-start mt-2">
            {payload.map((entry: any, index: number) => (
                <button
                    key={`legend-${index}`}
                    onClick={() => onClick(entry.value)}
                    className="flex items-center gap-1 cursor-pointer"
                >
                    <span
                        className="w-2 h-2 rounded-full"
                        style={{
                            backgroundColor: hiddenKeys.includes(entry.value)
                                ? "#ccc"
                                : entry.color,
                        }}
                    />
                    <span
                        className={`text-sm ${hiddenKeys.includes(entry.value) ? "opacity-50" : ""
                            }`}
                    >
                        {entry.value}
                    </span>
                </button>
            ))}
        </div>
    );
};

const DashboardCharts: React.FC = () => {
    const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);

    const handleLegendClick = (key: string) => {
        setHiddenKeys((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    return (
        <div className="flex md:flex-row flex-col gap-12">
            {/* Pie Chart */}
            <div className="relative md:w-[400px] w-[80%]">
                {/* <h2 className="text-lg font-semibold mb-4">סיכום בקשות</h2> */}
                <ResponsiveContainer width="100%" height={500}>
                    <PieChart>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            content={
                                <CustomLegend
                                    onClick={handleLegendClick}
                                    hiddenKeys={hiddenKeys}
                                />
                            }
                        />
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={70}
                            outerRadius={120}
                            paddingAngle={0}
                        >
                            {pieData.map((entry, index) =>
                                hiddenKeys.includes(entry.name) ? null : (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                )
                            )}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute text-sm flex flex-col top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2">
                    <b className="text-xl">314,932</b>
                    <span className="text-gray-500 text-sm font-normal">בקשות</span>
                </div>
            </div>
            {/* Bar Chart */}
            <div className="w-full">
                {/* <h2 className="text-lg font-semibold mb-4">סטטוס בקשות נייד</h2> */}
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart data={barData} barCategoryGap="100%" margin={{ top: 20, right: 10, left: -50, bottom: 20 }}>
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip content={<CustomTooltip />} />
                        {/* Removed Legend component from BarChart */}
                        {!hiddenKeys.includes("אושרו") && (
                            <Bar barSize={28} radius={[0, 0, 0, 0]} dataKey="approved" name="אושרו" fill="#648AA3" stackId="a" />
                        )}
                        {!hiddenKeys.includes("נדחו") && (
                            <Bar barSize={28} radius={[4, 4, 0, 0]} dataKey="rejected" name="נדחו" fill="#DACF61" stackId="a" />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardCharts;