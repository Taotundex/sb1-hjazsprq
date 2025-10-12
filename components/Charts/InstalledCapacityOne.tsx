"use client";

import Image from "next/image";
import React, { useState } from "react";
import download from '@/public/images/download_2.png'
import api from '@/public/images/API.png'
import {
    ResponsiveContainer,
    ComposedChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Bar,
} from "recharts";
import { ChevronDown } from "lucide-react";

// Data extracted from the image (values in MW)
const data = [
    { year: 2009, אחר: 600, תרמו: 500, פוטו: 200, רוח: 200 },
    { year: 2010, אחר: 700, תרמו: 600, פוטו: 300, רוח: 300 },
    { year: 2011, אחר: 800, תרמו: 700, פוטו: 400, רוח: 400 },
    { year: 2012, אחר: 800, תרמו: 700, פוטו: 500, רוח: 600 },
    { year: 2013, אחר: 1037, תרמו: 637, פוטו: 537, רוח: 769 },
    { year: 2014, אחר: 900, תרמו: 800, פוטו: 600, רוח: 700 },
    { year: 2015, אחר: 900, תרמו: 900, פוטו: 700, רוח: 800 },
    { year: 2016, אחר: 1100, תרמו: 900, פוטו: 800, רוח: 900 },
    { year: 2017, אחר: 1200, תרמו: 1000, פוטו: 900, רוח: 1000 },
    { year: 2018, אחר: 1400, תרמו: 1200, פוטו: 1100, רוח: 1400 },
    { year: 2019, אחר: 1500, תרמו: 1400, פוטו: 1200, רוח: 1600 },
    { year: 2020, אחר: 1700, תרמו: 1500, פוטו: 1300, רוח: 1700 },
    { year: 2021, אחר: 1900, תרמו: 1600, פוטו: 1400, רוח: 1800 },
    { year: 2022, אחר: 2100, תרמו: 1700, פוטו: 1500, רוח: 1900 },
    { year: 2023, אחר: 2200, תרמו: 1800, פוטו: 1600, רוח: 2100 },
    { year: 2024, אחר: 2400, תרמו: 1900, פוטו: 1700, רוח: 2200 },
];

// Energy categories (with Hebrew labels + colors) - REVERSED ORDER
const categories = [
    { key: "אחר", label: "אחר", color: "#2A6D94" },
    { key: "תרמו", label: "תרמו סולארי", color: "#60A261" },
    { key: "פוטו", label: "פוטו וולטאי", color: "#C4C95C" },
    { key: "רוח", label: "רוח", color: "#98C74E" },
];

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;
    const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
    return (
        <div className="rounded-lg shadow-xl border border-[#DEDEDE] bg-white p-4 min-w-[160px] text-sm">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="md:text-base text-sm font-medium mb-3 border-b border-[#707585]">סה"כ {total.toLocaleString()} MW</div>
            {payload.map((entry: any) => (
                <div key={entry.dataKey} className="flex items-start gap-2 mb-1">
                    <span
                        style={{ background: entry.color }}
                        className="w-2 h-2 rounded-full block mt-1"
                    />
                    <span className="flex flex-col text-sm font-normal">
                        {entry.dataKey} <span className="font-medium">{entry.value.toLocaleString()} MW</span>
                    </span>
                </div>
            ))}
        </div>
    );
};

// Custom legend under chart with interactive functionality
const CustomLegend = ({
    activeSeries,
    setActiveSeries,
}: {
    activeSeries: string | null;
    setActiveSeries: (s: string | null) => void;
}) => (
    <div className="flex flex-row-reverse justify-end gap-6 mt-4">
        {categories.map((c) => (
            <div
                key={c.key}
                onMouseEnter={() => setActiveSeries(c.key)}
                onMouseLeave={() => setActiveSeries(null)}
                className="flex items-center gap-2 cursor-pointer select-none"
            >
                <span
                    style={{
                        background: c.color,
                        opacity: activeSeries && activeSeries !== c.key ? 0.3 : 1,
                    }}
                    className="w-2 h-2 rounded-full inline-block"
                />
                <span className="text-sm">{c.label}</span>
            </div>
        ))}
    </div>
);

export default function InstalledCapacityOne() {
    const [tab, setTab] = useState(1);
    const [activeSeries, setActiveSeries] = useState<string | null>(null);

    // Function to determine opacity for each bar
    const opacityForKey = (key: string) =>
        activeSeries && activeSeries !== key ? 0.18 : 1;

    return (
        <div className="bg-white border border-[#E9C863] md:rounded-[40px] rounded-[20px] p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0">
                    <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        הספק מותקן (מצטבר) של מתקנים לייצור אנרגיות מתחדשות
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
                                <span className='text-sm text-slate-600'>שנה</span>
                                <select
                                    className="w-full border rounded-full px-3 py-1 text-xs h-8 appearance-none bg-white pr-6"
                                >
                                    <option>הכל</option>
                                    <option>הכל</option>
                                    <option>הכל</option>
                                </select>
                                {/* Custom dropdown arrow */}
                                <span className="pointer-events-none absolute left-3 top-[40px] -translate-y-1/2 text-black text-xs">
                                    <ChevronDown size={14} />
                                </span>
                            </label>
                        </div>
                        <div className="relative w-[179px]">
                            <label htmlFor="" className='flex flex-col gap-1'>
                                <span className='text-sm text-slate-600'>הספק/מספר מתקנים</span>
                                <select
                                    className="w-full border rounded-full px-3 py-1 text-xs h-8 appearance-none bg-white pr-6"
                                >
                                    <option value="">הספק מותקן</option>
                                    <option value="">הספק מותקן</option>
                                    <option value="">הספק מותקן</option>
                                </select>
                            </label>
                            <span className="pointer-events-none absolute left-3 top-[40px] -translate-y-1/2 text-black text-xs">
                                <ChevronDown size={14} />
                            </span>
                            {/* Custom dropdown arrow */}
                        </div>
                    </div>
                </div>
                <div className="flex items-start md:gap-4 gap-2">
                    <Image src={api} width={32} height={32} className='w-[32px] h-[32px]' alt='image' />
                    <Image src={download} width={32} height={32} className='w-[32px] h-[32px]' alt='image' />
                </div>
            </div>


            {tab === 1 ? (
                <>
                    <div className="w-full md:h-[500px] h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                                data={data}
                                margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
                            >
                                <CartesianGrid vertical={false} strokeDasharray="6 6" />
                                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} label={{
                                    value: "הספק מותקן [MW]",
                                    angle: -90,
                                    position: "insideLeft",
                                    style: { textAnchor: 'middle' }
                                }} />
                                <Tooltip content={<CustomTooltip />} />
                                {categories.map((c) => (
                                    <Bar
                                        key={c.key}
                                        dataKey={c.key}
                                        stackId="a"
                                        fill={c.color}
                                        barSize={28}
                                        opacity={opacityForKey(c.key)}
                                    />
                                ))}
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
                                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} label={{
                                    value: "הספק מותקן [MW]",
                                    angle: -90,
                                    position: "insideLeft",
                                    style: { textAnchor: 'middle' }
                                }} />
                                <Tooltip content={<CustomTooltip />} />
                                {categories.map((c) => (
                                    <Bar
                                        key={c.key}
                                        dataKey={c.key}
                                        stackId="a"
                                        fill={c.color}
                                        barSize={28}
                                        opacity={opacityForKey(c.key)}
                                    />
                                ))}
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
                    className={`rounded-full md:px-5 px-2 md:py-[6px] py-[2px] font-black md:text-base text-xs ${tab === 1 ? "bg-[#59687D] text-white hover:bg-[#59687D] hover:text-white" : "bbg-transparent text-[#59687D] hover:bg-[#59687D] hover:text-white"
                        }`}
                    onClick={() => setTab(1)}
                >
                    הספק מיוצר
                </button>
                <button
                    className={`rounded-full md:px-5 px-2 md:py-[6px] py-[2px] font-black md:text-base text-xs ${tab === 2 ? "bg-[#59687D] text-white hover:bg-[#59687D] hover:text-white" : "bg-transparent text-[#59687D] hover:bg-[#59687D] hover:text-white"
                        }`}
                    onClick={() => setTab(2)}
                >
                    אחוז מכלל הייצור
                </button>
            </div>
        </div>
    );
}