"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { useState } from "react";

const data = [
    { time: "00:00", withExc: 7000, withoutExc: 5200 },
    { time: "02:00", withExc: 6500, withoutExc: 4700 },
    { time: "04:00", withExc: 6300, withoutExc: 4800 },
    { time: "06:00", withExc: 7200, withoutExc: 5100 },
    { time: "07:00", withExc: 3200, withoutExc: 6000 },
    { time: "08:00", withExc: 6800, withoutExc: 5100 },
    { time: "10:00", withExc: 6400, withoutExc: 4800 },
    { time: "12:00", withExc: 6100, withoutExc: 4300 },
    { time: "14:00", withExc: 5700, withoutExc: 3900 },
    { time: "16:00", withExc: 5900, withoutExc: 4200 },
    { time: "18:00", withExc: 5700, withoutExc: 4000 },
    { time: "20:00", withExc: 5400, withoutExc: 3700 },
    { time: "22:00", withExc: 5600, withoutExc: 3900 },
    { time: "24:00", withExc: 5800, withoutExc: 4100 },
];

// Custom Tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 rounded-[10px] shadow-md border-none" style={{ boxShadow: "0px 2px 30px 2px #99BF4129" }}>
                <p className="text-gray-700 font-medium mb-2 border-b border-[#59687D]">{label}</p>
                <div className="space-y-1">
                    {payload.map((entry: any, index: number) => (
                        <div key={`item-${index}`} className="flex items-center">
                            <div
                                className="w-2 h-2 rounded-full ml-2"
                                style={{ backgroundColor: entry.color }}
                            ></div>
                            <span className="text-sm text-[#484C56]">{entry.name}</span>
                            <span className="text-gray-600 mx-1">|</span>
                            <span className="text-sm text-[#484C56] ml-1">
                                {entry.value.toLocaleString()} ₪
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

// Custom Legend component
const renderLegend = (props: any) => {
    const { payload } = props;
    const [activeSeries, setActiveSeries] = useState<string[]>([]);

    const handleClick = (dataKey: string) => {
        if (activeSeries.includes(dataKey)) {
            setActiveSeries(activeSeries.filter(key => key !== dataKey));
        } else {
            setActiveSeries([...activeSeries, dataKey]);
        }
    };

    return (
        <div className="flex flex-row-reverse justify-end mt-4">
            {payload.map((entry: any, index: number) => {
                const isActive = !activeSeries.includes(entry.dataKey);

                return (
                    <div
                        key={`legend-${index}`}
                        onClick={() => handleClick(entry.dataKey)}
                        className={`flex items-center cursor-pointer md:px-3 px-2 py-1 rounded-lg ${isActive ? 'bg-transparent' : 'opacity-50'
                            }`}
                    >
                        <div
                            className="w-2 h-2 rounded-full ml-2"
                            style={{ backgroundColor: entry.color }}
                        ></div>
                        <span className="md:text-sm text-[10px]">{entry.value}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default function SMPGraph() {
    return (
        <div className="w-full h-[500px]">
            <ResponsiveContainer width="100%" height="95%">
                <LineChart
                    data={data}
                    margin={{ top: 10, right: 10, left: -50, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="time"
                        tick={{ fontSize: 12 }}
                        axisLine={true}
                    />
                    <YAxis
                        domain={[0, 10000]}
                        tick={{ fontSize: 12 }}
                        axisLine={true}
                        tickMargin={10}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={renderLegend} />
                    <Line
                        type="linear"
                        dataKey="withoutExc"
                        stroke="#166534"
                        strokeWidth={2}
                        dot={false}
                        name="מחיר שוליי ללא אילוצים"
                    />
                    <Line
                        type="linear"
                        dataKey="withExc"
                        stroke="#eab308"
                        strokeWidth={2}
                        dot={false}
                        name="מחיר שוליי כולל אילוצים"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}