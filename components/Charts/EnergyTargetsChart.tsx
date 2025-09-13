"use client";

import React from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

type DataItem = {
    year: number;
    target: number;
    actual: number;
    ministryTarget: number;
    nzoTarget: number;
};

const data: DataItem[] = [
    { year: 2020, target: 12, actual: 10, ministryTarget: 15, nzoTarget: 16 },
    { year: 2021, target: 14, actual: 12, ministryTarget: 16, nzoTarget: 17 },
    { year: 2022, target: 16, actual: 14, ministryTarget: 17, nzoTarget: 18 },
    { year: 2023, target: 18, actual: 16, ministryTarget: 18, nzoTarget: 19 },
    { year: 2024, target: 20, actual: 18, ministryTarget: 19, nzoTarget: 20 },
    { year: 2025, target: 22, actual: 20, ministryTarget: 20, nzoTarget: 21 },
    { year: 2030, target: 25, actual: 22, ministryTarget: 23, nzoTarget: 24 },
];

const EnergyTargetsChart = () => {
    return (
        <div className="w-full h-[500px] bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">
                יעדי אנרגיות מתחדשות מול ייצור בפועל
            </h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 40, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0, 50]} tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(value: any) => `${value}%`} />
                    <Legend />
                    {/* Actual (Bars) */}
                    <Bar dataKey="actual" fill="#2f855a" name="לפי ייצור בפועל" />
                    {/* Targets */}
                    <Line type="monotone" dataKey="target" stroke="#f6ad55" strokeWidth={2} name="יעד אנרגיות מתחדשות" />
                    <Line type="monotone" dataKey="ministryTarget" stroke="#63b3ed" strokeWidth={2} name="לפי יעד משרד האנרגיה" />
                    <Line type="monotone" dataKey="nzoTarget" stroke="#805ad5" strokeWidth={2} name="לפי יעד NZO" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EnergyTargetsChart;
