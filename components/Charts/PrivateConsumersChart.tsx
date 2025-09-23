"use client";

import React, { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
} from "recharts";

// Sample data
const data = [
    { month: "01/24", virtual: 12, withProduction: 12 },
    { month: "02/24", virtual: 15, withProduction: 20 },
    { month: "03/24", virtual: 10, withProduction: 14 },
    { month: "04/24", virtual: 37, withProduction: 20 },
    { month: "05/24", virtual: 12, withProduction: 12 },
    { month: "06/24", virtual: 12, withProduction: 12 },
    { month: "07/24", virtual: 12, withProduction: 12 },
    { month: "08/24", virtual: 12, withProduction: 12 },
    { month: "09/24", virtual: 12, withProduction: 12 },
    { month: "10/24", virtual: 12, withProduction: 12 },
    { month: "11/24", virtual: 20, withProduction: 14 },
    { month: "12/24", virtual: 12, withProduction: 12 },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const total = payload.reduce((acc: number, cur: any) => acc + cur.value, 0);
        return (
            <div className="bg-white p-2 rounded-[10px] shadow-md border-none" style={{ boxShadow: "0px 2px 30px 2px #99BF4129" }}>
                <p className="font-normal text-[#59687D] text-sm">{label}</p>
                <p className="text-[#59687D] font-medium text-base border-b border-[#59687D]">סה"כ {total.toLocaleString()}</p>
                {payload.map((entry: any, index: number) => (
                    <div
                        key={index}
                        className="flex gap-1 items-start pt-1"
                        style={{ color: entry.color }}
                    >
                        <div
                            className="w-2 h-2 rounded-full ml-2 mt-1"
                            style={{ backgroundColor: entry.color }}
                        ></div>
                        <span className="flex flex-col text-[#59687D] text-sm leading-4">
                            <span className="font-normal">
                                {entry.name === "virtual" ? "מספקים וירטואליים" : "מספקים עם אמצעי ייצור"}
                            </span>
                            <span className="font-semibold">{entry.value.toLocaleString()}</span>
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const PrivateConsumersChart = () => {
    const [hiddenBars, setHiddenBars] = useState<string[]>([]);
    const [hoveredBar, setHoveredBar] = useState<string | null>(null);

    const handleLegendClick = (payload: any) => {
        const { dataKey } = payload;
        if (hiddenBars.includes(dataKey)) {
            setHiddenBars(hiddenBars.filter(key => key !== dataKey));
        } else {
            setHiddenBars([...hiddenBars, dataKey]);
        }
    };

    const handleLegendMouseEnter = (dataKey: string) => {
        setHoveredBar(dataKey);
    };

    const handleLegendMouseLeave = () => {
        setHoveredBar(null);
    };

    // Determine if a bar should be faded
    const getBarOpacity = (dataKey: string) => {
        if (!hoveredBar) return 1; // No hover, full opacity
        if (hoveredBar === dataKey) return 1; // Hovered bar, full opacity
        return 0.3; // Other bars, faded
    };

    // Custom Legend component
    const CustomLegend = ({ payload, onClick, onMouseEnter, onMouseLeave }: any) => {
        return (
            <div className="flex gap-3">
                {payload.map((entry: any, index: number) => {
                    const isHidden = hiddenBars.includes(entry.dataKey);
                    const isHovered = hoveredBar === entry.dataKey;

                    return (
                        <div
                            key={`legend-${index}`}
                            className={`flex items-center cursor-pointer px-3 py-1 rounded-lg transition-all duration-200 ${isHidden ? 'opacity-50' : ''
                                } ${isHovered ? 'bg-gray-100' : ''}`}
                            onClick={() => onClick(entry)}
                            onMouseEnter={() => onMouseEnter(entry.dataKey)}
                            onMouseLeave={onMouseLeave}
                        >
                            <div
                                className="w-2 h-2 rounded-full ml-2"
                                style={{
                                    backgroundColor: entry.color,
                                    opacity: isHovered ? 1 : getBarOpacity(entry.dataKey)
                                }}
                            ></div>
                            <span
                                className="md:text-sm text-[10px]"
                                style={{ opacity: isHovered ? 1 : getBarOpacity(entry.dataKey) }}
                            >
                                {entry.dataKey === "virtual" ? "מספקים וירטואליים" : "מספקים עם אמצעי ייצור"}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="w-full md:h-[500px] h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 10, left: -50, bottom: 20 }}
                    barCategoryGap="25%"
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        content={
                            <CustomLegend
                                onClick={handleLegendClick}
                                onMouseEnter={handleLegendMouseEnter}
                                onMouseLeave={handleLegendMouseLeave}
                            />
                        }
                    />
                    <Bar
                        dataKey="virtual"
                        name="מספקים וירטואליים"
                        stackId="a"
                        fill="#F4D150"
                        barSize={28}
                        radius={[0, 0, 0, 0]}
                        hide={hiddenBars.includes("virtual")}
                        opacity={getBarOpacity("virtual")}
                    />
                    <Bar
                        dataKey="withProduction"
                        name="מספקים עם אמצעי ייצור"
                        stackId="a"
                        fill="#3A7C2F"
                        barSize={28}
                        radius={[4, 4, 0, 0]}
                        hide={hiddenBars.includes("withProduction")}
                        opacity={getBarOpacity("withProduction")}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PrivateConsumersChart;