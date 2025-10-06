"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import {
    ResponsiveContainer,
    ComposedChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Bar,
    LabelList,
} from "recharts";

// Data from the uploaded district chart
type DataPoint = {
    district: string;
    total: number;
    positive: number;
    partialPositive: number;
    limitedPositive: number;
    negative: number;
};

const data: DataPoint[] = [
    { district: "דרום", total: 6441, positive: 1800, partialPositive: 1600, limitedPositive: 1000, negative: 2041 },
    { district: "צפון", total: 5864, positive: 1750, partialPositive: 1500, limitedPositive: 950, negative: 1664 },
    { district: "מרכז", total: 1660, positive: 600, partialPositive: 450, limitedPositive: 200, negative: 410 },
    { district: "חיפה", total: 684, positive: 320, partialPositive: 147, limitedPositive: 80, negative: 87 },
    { district: "יו״ש", total: 623, positive: 300, partialPositive: 140, limitedPositive: 70, negative: 113 },
    { district: "ירושלים", total: 298, positive: 150, partialPositive: 80, limitedPositive: 30, negative: 38 },
    { district: "תל אביב", total: 125, positive: 60, partialPositive: 30, limitedPositive: 15, negative: 20 },
];

// Legend series config
const series = [
    { key: "positive", label: "חיובית", color: "#60A261" },
    { key: "partialPositive", label: "חיובית חלקית", color: "#957669" },
    { key: "limitedPositive", label: "חיובית מוגבלת", color: "#6B707C" },
    { key: "negative", label: "שלילית", color: "#CEA073" },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || payload.length === 0) return null;
    const point = payload[0]?.payload;

    return (
        <div className="rounded-lg shadow-xl border border-[#DEDEDE] bg-white p-4 min-w-[160px] text-sm">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="md:text-base text-sm font-medium mb-3 border-b border-[#707585]">
                סה״כ {point.total.toLocaleString()}
            </div>

            {series.map((s) => {
                const val = point[s.key as keyof DataPoint];
                return (
                    <div key={s.key} className="flex items-center gap-3 mb-1">
                        <span
                            style={{ background: s.color }}
                            className="w-2 h-2 rounded-full block"
                        />
                        <div className="flex flex-col text-sm text-gray-600">
                            <span>{s.label}</span>
                            <span className="font-medium flex items-center gap-1">
                                <span>MW</span> {val}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// Custom Legend
const CustomLegend = ({
    activeSeries,
    setActiveSeries,
}: {
    activeSeries: string | null;
    setActiveSeries: (s: string | null) => void;
}) => (
    <div className="flex flex-row-reverse justify-end gap-6 mt-6">
        {series.map((s) => (
            <div
                key={s.key}
                onMouseEnter={() => setActiveSeries(s.key)}
                onMouseLeave={() => setActiveSeries(null)}
                className="flex items-center gap-2 text-sm cursor-pointer select-none"
            >
                <span
                    style={{
                        background: s.color,
                        opacity: activeSeries && activeSeries !== s.key ? 0.3 : 1,
                    }}
                    className="w-2 h-2 rounded-full block"
                />
                <span>{s.label}</span>
            </div>
        ))}
    </div>
);

export default function RequestThree() {
    const [activeSeries, setActiveSeries] = useState<string | null>(null);
    const [tab, setTab] = useState<"chart" | "text">("chart");

    const opacityForKey = (key: string) =>
        activeSeries && activeSeries !== key ? 0.18 : 1;

    return (
        <div className="bg-white border border-[#E9C863] md:rounded-[40px] rounded-[20px] p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0">
                    <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        הספק תשובות מחלק לפי מחוז
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.5">
                                <path d="M10.5 0.545898C4.98 0.545898 0.5 5.0259 0.5 10.5459C0.5 16.0659 4.98 20.5459 10.5 20.5459C16.02 20.5459 20.5 16.0659 20.5 10.5459C20.5 5.0259 16.02 0.545898 10.5 0.545898ZM10.5 18.5459C6.09 18.5459 2.5 14.9559 2.5 10.5459C2.5 6.1359 6.09 2.5459 10.5 2.5459C14.91 2.5459 18.5 6.1359 18.5 10.5459C18.5 14.9559 14.91 18.5459 10.5 18.5459Z" fill="#A1A1A1" />
                                <path d="M9.5 5.5459H11.5V7.5459H9.5V5.5459ZM9.5 9.5459H11.5V15.5459H9.5V9.5459Z" fill="#A1A1A1" />
                            </g>
                        </svg>
                    </h2>
                    <div className="flex flex-wrap items-center gap-5">
                        <span className="text-sm text-slate-600 mt-6">מיון לפי:</span>

                        <div className="relative w-[113px]">
                            <label htmlFor="" className='flex flex-col gap-1'>
                                <span className='text-sm text-slate-600'>מיקום:</span>
                                <select
                                    className="w-full border rounded-full px-3 py-1 text-xs h-8 appearance-none bg-white pr-6"
                                >
                                    <option>2025</option>
                                    <option>2024</option>
                                    <option>2023</option>
                                </select>
                                {/* Custom dropdown arrow */}
                                <span className="pointer-events-none absolute left-3 top-[40px] -translate-y-1/2 text-black text-xs">
                                    <ChevronDown size={14} />
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {tab === "chart" ? (
                <>
                    <div className="w-full md:h-[500px] h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                                data={data}
                                margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
                            >
                                <CartesianGrid vertical={false} strokeDasharray="6 6" />
                                <XAxis dataKey="district" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} />

                                {/* Bars */}
                                <Bar
                                    dataKey="positive"
                                    stackId="a"
                                    fill={series[0].color}
                                    barSize={104}
                                    opacity={opacityForKey("positive")}
                                />
                                <Bar
                                    dataKey="partialPositive"
                                    stackId="a"
                                    fill={series[1].color}
                                    barSize={104}
                                    opacity={opacityForKey("partialPositive")}
                                />
                                <Bar
                                    dataKey="limitedPositive"
                                    stackId="a"
                                    fill={series[2].color}
                                    barSize={104}
                                    opacity={opacityForKey("limitedPositive")}
                                />
                                <Bar
                                    dataKey="negative"
                                    stackId="a"
                                    fill={series[3].color}
                                    barSize={104}
                                    opacity={opacityForKey("negative")}
                                >
                                    <LabelList
                                        dataKey="total"
                                        position="top"
                                        style={{ fill: "#707585", fontWeight: 500 }}
                                    />
                                </Bar>
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    <CustomLegend
                        activeSeries={activeSeries}
                        setActiveSeries={setActiveSeries}
                    />
                </>
            ) : (
                <>
                    <div className="w-full md:h-[500px] h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                                data={data}
                                margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
                            >
                                <CartesianGrid vertical={false} strokeDasharray="6 6" />
                                <XAxis dataKey="district" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} />

                                {/* Bars */}
                                <Bar
                                    dataKey="positive"
                                    stackId="a"
                                    fill={series[0].color}
                                    barSize={104}
                                    opacity={opacityForKey("positive")}
                                />
                                <Bar
                                    dataKey="partialPositive"
                                    stackId="a"
                                    fill={series[1].color}
                                    barSize={104}
                                    opacity={opacityForKey("partialPositive")}
                                />
                                <Bar
                                    dataKey="limitedPositive"
                                    stackId="a"
                                    fill={series[2].color}
                                    barSize={104}
                                    opacity={opacityForKey("limitedPositive")}
                                />
                                <Bar
                                    dataKey="negative"
                                    stackId="a"
                                    fill={series[3].color}
                                    barSize={104}
                                    opacity={opacityForKey("negative")}
                                >
                                    <LabelList
                                        dataKey="total"
                                        position="top"
                                        style={{ fill: "#707585", fontWeight: 500 }}
                                    />
                                </Bar>
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    <CustomLegend
                        activeSeries={activeSeries}
                        setActiveSeries={setActiveSeries}
                    />
                </>
            )}

            {/* Tabs */}
            <div className="flex gap-1 md:p-[6px] p-1 rounded-full bg-[#F8F8F8] mb-4 w-fit ml-auto -mt-10" style={{ boxShadow: "inset 0px 4px 10px 0px #0000001A" }}>
                <button
                    onClick={() => setTab("chart")}
                    className={`rounded-full md:px-5 px-2 md:py-[6px] py-[2px] font-black md:text-base text-xs ${tab === "chart" ? "bg-[#59687D] text-white hover:bg-[#59687D] hover:text-white" : "bbg-transparent text-[#59687D] hover:bg-[#59687D] hover:text-white"
                        }`}
                >
                    הספק מתקנים
                </button>
                <button
                    onClick={() => setTab("text")}
                    className={`rounded-full md:px-5 px-2 md:py-[6px] py-[2px] font-black md:text-base text-xs ${tab === "text" ? "bg-[#59687D] text-white hover:bg-[#59687D] hover:text-white" : "bbg-transparent text-[#59687D] hover:bg-[#59687D] hover:text-white"
                        }`}
                >
                    מספר מתקנים
                </button>
            </div>
        </div>
    );
}
