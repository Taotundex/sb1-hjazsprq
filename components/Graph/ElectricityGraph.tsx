"use client";

import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ScatterChart,
    Scatter,
    ZAxis
} from "recharts";
import { Button } from "../ui/button";
import { ElectricityScatterGraph } from "./ElectricityScatterGraph";

// Data for the line chart
const lineData = [
    { time: "00:00", withExc: 110, withoutExc: 130, demandWith: 2800, demandWithout: 6300 },
    { time: "01:00", withExc: 135, withoutExc: 155, demandWith: 2600, demandWithout: 6100 },
    { time: "02:00", withExc: 75, withoutExc: 95, demandWith: 2500, demandWithout: 6000 },
    { time: "03:00", withExc: 74, withoutExc: 94, demandWith: 2700, demandWithout: 6200 },
    { time: "04:00", withExc: 73, withoutExc: 93, demandWith: 2800, demandWithout: 6300 },
    { time: "05:00", withExc: 100, withoutExc: 120, demandWith: 2600, demandWithout: 6000 },
    { time: "06:00", withExc: 120, withoutExc: 140, demandWith: 2500, demandWithout: 5900 },
    { time: "07:00", withExc: 100, withoutExc: 120, demandWith: 2650, demandWithout: 6050 },
    { time: "08:00", withExc: 75, withoutExc: 95, demandWith: 2700, demandWithout: 6100 },
    { time: "09:00", withExc: 75, withoutExc: 95, demandWith: 2800, demandWithout: 6300 },
    { time: "10:00", withExc: 45, withoutExc: 65, demandWith: 2600, demandWithout: 6100 },
    { time: "11:00", withExc: 45, withoutExc: 65, demandWith: 2500, demandWithout: 6000 },
    { time: "12:00", withExc: 40, withoutExc: 60, demandWith: 2700, demandWithout: 6200 },
    { time: "13:00", withExc: 61, withoutExc: 81, demandWith: 2800, demandWithout: 6300 },
    { time: "14:00", withExc: 57, withoutExc: 77, demandWith: 2600, demandWithout: 6000 },
    { time: "15:00", withExc: 59, withoutExc: 79, demandWith: 2500, demandWithout: 5900 },
    { time: "16:00", withExc: 49, withoutExc: 69, demandWith: 2650, demandWithout: 6050 },
    { time: "17:00", withExc: 89, withoutExc: 109, demandWith: 2700, demandWithout: 6100 },
    { time: "18:00", withExc: 56, withoutExc: 76, demandWith: 2800, demandWithout: 6300 },
    { time: "19:00", withExc: 23, withoutExc: 33, demandWith: 2600, demandWithout: 6100 },
    { time: "20:00", withExc: 56, withoutExc: 76, demandWith: 2500, demandWithout: 6000 },
    { time: "21:00", withExc: 20, withoutExc: 40, demandWith: 2700, demandWithout: 6200 },
    { time: "22:00", withExc: 50, withoutExc: 70, demandWith: 2800, demandWithout: 6300 },
    { time: "23:00", withExc: 80, withoutExc: 100, demandWith: 2600, demandWithout: 6000 },
    { time: "24:00", withExc: 56, withoutExc: 76, demandWith: 2500, demandWithout: 5900 },
];

// Data for the scatter chart
const scatterData = [
    { hour: 0, price: 110, demand: 2800, size: 40 },
    { hour: 1, price: 135, demand: 2600, size: 35 },
    { hour: 2, price: 75, demand: 2500, size: 30 },
    { hour: 3, price: 74, demand: 2700, size: 45 },
    { hour: 4, price: 73, demand: 2800, size: 50 },
    { hour: 5, price: 100, demand: 2600, size: 35 },
    { hour: 6, price: 120, demand: 2500, size: 30 },
    { hour: 7, price: 100, demand: 2650, size: 40 },
    { hour: 8, price: 75, demand: 2700, size: 45 },
    { hour: 9, price: 75, demand: 2800, size: 50 },
    { hour: 10, price: 45, demand: 2600, size: 35 },
    { hour: 11, price: 45, demand: 2500, size: 30 },
    { hour: 12, price: 40, demand: 2700, size: 40 },
    { hour: 13, price: 61, demand: 2800, size: 45 },
    { hour: 14, price: 57, demand: 2600, size: 35 },
    { hour: 15, price: 59, demand: 2500, size: 30 },
    { hour: 16, price: 49, demand: 2650, size: 40 },
    { hour: 17, price: 89, demand: 2700, size: 45 },
    { hour: 18, price: 56, demand: 2800, size: 50 },
    { hour: 19, price: 23, demand: 2600, size: 35 },
    { hour: 20, price: 56, demand: 2500, size: 30 },
    { hour: 21, price: 20, demand: 2700, size: 40 },
    { hour: 22, price: 50, demand: 2800, size: 45 },
    { hour: 23, price: 80, demand: 2600, size: 35 },
    { hour: 24, price: 56, demand: 2500, size: 30 },
];

// Custom Tooltip component for Line Chart
const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 rounded-[10px] shadow-md border-none" style={{ boxShadow: "0px 2px 30px 2px #99BF4129" }}>
                <p className="text-gray-700 font-medium mb-2 border-b border-[#59687D]">{label}</p>
                <div className="space-y-1">
                    {payload.map((entry: any, index: number) => (
                        <div key={`item-${index}`} className="flex flex-col">
                            <div className="flex items-center">
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
                            <span className="text-sm text-[#484C56] mr-4 leading-3">
                                {entry.value.toLocaleString()} MW
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

// Custom Tooltip component for Scatter Chart
const CustomScatterTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 rounded-[10px] shadow-md border-none" style={{ boxShadow: "0px 2px 30px 2px #99BF4129" }}>
                <p className="text-gray-700 font-medium mb-2 border-b border-[#59687D]">שעה {payload[0].payload.hour}:00</p>
                <div className="space-y-1">
                    <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full ml-2 bg-[#1E8025]"></div>
                        <span className="text-sm text-[#484C56]">מחיר</span>
                        <span className="text-gray-600 mx-1">|</span>
                        <span className="text-sm text-[#484C56] ml-1">
                            {payload[0].value.toLocaleString()} ₪
                        </span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full ml-2 bg-[#eab308]"></div>
                        <span className="text-sm text-[#484C56]">ביקוש</span>
                        <span className="text-gray-600 mx-1">|</span>
                        <span className="text-sm text-[#484C56] ml-1">
                            {payload[1].value.toLocaleString()} MW
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

// Line Chart Component
const ElectricityLineGraph = () => {
    const [activeSeries, setActiveSeries] = useState<string[]>([]);

    const handleLegendClick = (dataKey: string) => {
        if (activeSeries.includes(dataKey)) {
            setActiveSeries(activeSeries.filter(key => key !== dataKey));
        } else {
            setActiveSeries([...activeSeries, dataKey]);
        }
    };

    const renderLegend = (props: any) => {
        const { payload } = props;

        return (
            <div className="flex items-center justify-between ml-10 mt-6">
                <div className="flex flex-row-reverse justify-end">
                    {payload.map((entry: any, index: number) => {
                        const isActive = !activeSeries.includes(entry.dataKey);

                        return (
                            <div
                                key={`legend-${index}`}
                                onClick={() => handleLegendClick(entry.dataKey)}
                                className={`flex items-center cursor-pointer px-3 py-1 rounded-lg ${isActive ? 'bg-transparent' : 'opacity-50'
                                    }`}
                            >
                                <div
                                    className="w-2 h-2 rounded-full ml-2"
                                    style={{ backgroundColor: entry.color }}
                                ></div>
                                <span className="text-sm">{entry.value}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={lineData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="time"
                        tick={{ fontSize: 12 }}
                        axisLine={true}
                    />
                    <YAxis
                        yAxisId="left"
                        orientation="left"
                        domain={[0, 220]}
                        tick={{ fontSize: 12 }}
                        axisLine={true}
                        tickMargin={10}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 11000]}
                        tick={{ fontSize: 12 }}
                        axisLine={true}
                        tickMargin={10}
                    />
                    <Tooltip content={<CustomLineTooltip />} />
                    <Legend content={renderLegend} />
                    <Line
                        yAxisId="left"
                        type="linear"
                        dataKey="withoutExc"
                        stroke="#166534"
                        strokeWidth={2}
                        dot={false}
                        name="מחיר שוליי ללא אילוצים"
                        hide={activeSeries.includes("withoutExc")}
                    />
                    <Line
                        yAxisId="left"
                        type="linear"
                        dataKey="withExc"
                        stroke="#eab308"
                        strokeWidth={2}
                        dot={false}
                        name="מחיר שוליי כולל אילוצים"
                        hide={activeSeries.includes("withExc")}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

// Scatter Chart Component
// const ElectricityScatterGraph = () => {
//     return (
//         <div className="w-full h-[500px]">
//             <ResponsiveContainer width="100%" height="95%">
//                 <ScatterChart
//                     margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
//                 >
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                     <XAxis
//                         type="number"
//                         dataKey="hour"
//                         name="שעה"
//                         domain={[0, 24]}
//                         tickCount={13}
//                         tick={{ fontSize: 12 }}
//                     />
//                     <YAxis
//                         type="number"
//                         dataKey="price"
//                         name="מחיר"
//                         domain={[0, 200]}
//                         tick={{ fontSize: 12 }}
//                     />
//                     <ZAxis
//                         type="number"
//                         dataKey="demand"
//                         range={[50, 300]}
//                         name="ביקוש"
//                     />
//                     <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomScatterTooltip />} />
//                     <Scatter
//                         name="מחיר vs ביקוש"
//                         data={scatterData}
//                         fill="#1E8025"
//                         shape="circle"
//                     />
//                 </ScatterChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// Main Component with Tab Switching
const ElectricityGraphWithTabs = () => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('יומי');
    const [chartView, setChartView] = useState<'time' | 'scatter'>('time');

    return (
        <div className="h-full w-full p-4">
            <div className="">
                <div className="flex flex-col gap-2 my-[30px] w-full">
                    <div className="md:mt-[60px] mt-10 w-full">
                        <div className='flex flex-col gap-6'>
                            <div className="">
                                {chartView === 'time' ? <ElectricityLineGraph /> : <ElectricityScatterGraph />}
                                <div className="flex gap-1 p-[6px] rounded-full bg-[#F8F8F8] mb-4 w-fit ml-auto mt-5" style={{ boxShadow: "inset 0px 4px 10px 0px #0000001A" }}>
                                    <Button
                                        onClick={() => setChartView('time')}
                                        className={`rounded-full px-5 py-[6px] font-black text-base ${chartView === 'time'
                                            ? 'bg-[#59687D] text-white hover:bg-[#59687D] hover:text-white'
                                            : 'bg-transparent text-[#59687D] hover:bg-[#59687D] hover:text-white'
                                            }`}
                                    >
                                        על פני זמן
                                    </Button>
                                    <Button
                                        onClick={() => setChartView('scatter')}
                                        className={`rounded-full px-5 py-[6px] text-base ${chartView === 'scatter'
                                            ? 'bg-[#59687D] text-white hover:bg-[#59687D] hover:text-white'
                                            : 'bg-transparent text-[#59687D] hover:bg-[#59687D] hover:text-white'
                                            }`}
                                    >
                                        פיזור נתונים
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElectricityGraphWithTabs;