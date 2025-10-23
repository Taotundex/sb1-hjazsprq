"use client";

import Image from "next/image";
import React, { useState } from "react";
import download from '@/public/images/download_2.png'
import api from '@/public/images/API.png'
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

// Example dataset (each metric has both % and TWh values)
const data = [
    { year: 2020, actual: { pct: 16, twh: 23 }, ministry: { pct: 24, twh: 8 }, nzo: { pct: 20, twh: 30 } },
    { year: 2022, actual: { pct: 20, twh: 27 }, ministry: { pct: 28, twh: 0 }, nzo: { pct: 24, twh: 33 } },
    { year: 2024, actual: { pct: 24, twh: 29 }, ministry: { pct: 32, twh: 2 }, nzo: { pct: 28, twh: 35 } },
    { year: 2026, actual: { pct: 28, twh: 31 }, ministry: { pct: 36, twh: 4 }, nzo: { pct: 32, twh: 37 } },
    { year: 2028, actual: { pct: 33, twh: 33 }, ministry: { pct: 41, twh: 6 }, nzo: { pct: 37, twh: 39 } },
    { year: 2030, actual: { pct: 38, twh: 35 }, ministry: { pct: 47, twh: 8 }, nzo: { pct: 44, twh: 41 } },
    { year: 2032, actual: { pct: 43, twh: 40 }, ministry: { pct: 53, twh: 3 }, nzo: { pct: 50, twh: 46 } },
    { year: 2034, actual: { pct: 48, twh: 45 }, ministry: { pct: 59, twh: 8 }, nzo: { pct: 56, twh: 51 } },
    { year: 2036, actual: { pct: 53, twh: 51 }, ministry: { pct: 66, twh: 3 }, nzo: { pct: 62, twh: 56 } },
    { year: 2036, actual: { pct: 58, twh: 57 }, ministry: { pct: 73, twh: 8 }, nzo: { pct: 68, twh: 62 } },
    { year: 2040, actual: { pct: 66, twh: 63 }, ministry: { pct: 80, twh: 6 }, nzo: { pct: 74, twh: 68 } },
    { year: 2042, actual: { pct: 72, twh: 69 }, ministry: { pct: 87, twh: 2 }, nzo: { pct: 80, twh: 74 } },
    { year: 2044, actual: { pct: 78, twh: 75 }, ministry: { pct: 96, twh: 8 }, nzo: { pct: 88, twh: 80 } },
    { year: 2046, actual: { pct: 84, twh: 81 }, ministry: { pct: 106, twh: 8 }, nzo: { pct: 95, twh: 86 } },
    { year: 2048, actual: { pct: 90, twh: 87 }, ministry: { pct: 114, twh: 9 }, nzo: { pct: 103, twh: 92 } },
    { year: 2050, actual: { pct: 97, twh: 95 }, ministry: { pct: 124, twh: 7 }, nzo: { pct: 110, twh: 99 } },
];

// Custom Tooltip (only 3 series)
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        // Filter out duplicate entries (since we have both Bar and Line for each series)
        const uniquePayload = payload.filter((item: any, index: number, self: any[]) =>
            index === self.findIndex((t) => t.dataKey === item.dataKey)
        );

        return (
            <div className="bg-white shadow-lg rounded-lg p-3 border border-gray-200 text-sm">
                <p className="font-semibold">שנה: {label}</p>
                {uniquePayload.map((p: any) => {
                    const value = p.value;
                    const dataKey = p.dataKey.split('.')[0]; // Get the main key (actual, ministry, nzo)
                    const twh = p.payload[dataKey]?.twh;
                    return (
                        <p
                            key={p.dataKey}
                            className="mt-1 text-[#484C56] md:text-sm text-sm font-medium"
                        >
                            <span className="text-[#59687D] font-normal">
                                {p.name}
                            </span>
                            <br />
                            {value}% | {twh} TWh
                        </p>
                    );
                })}
            </div>
        );
    }
    return null;
};

export default function RenewableChart() {
    const [hovered, setHovered] = useState<string | null>(null);
    const [active, setActive] = useState({
        actual: true,
        ministry: true,
        nzo: true
    });

    const toggle = (key: keyof typeof active) =>
        setActive((prev) => ({ ...prev, [key]: !prev[key] }));

    const opacity = (key: string) => {
        if (!hovered) return 1;
        return hovered === key ? 1 : 0.3;
    };

    const getLegendOpacity = (key: string) => {
        if (!hovered) return 1;
        return hovered === key ? 1 : 0.5;
    };

    // Function to get the color for a series (considering hover and active states)
    const getSeriesColor = (seriesKey: string, defaultColor: string) => {
        if (!active[seriesKey as keyof typeof active]) {
            return "#ccc";
        }
        if (hovered && hovered !== seriesKey) {
            return "#ccc";
        }
        return defaultColor;
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                    יעדי אנרגיות מתחדשות מול ייצור בפועל
                    <TooltipProvider>
                        <UITooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="inline-flex items-center">
                                    <svg
                                        width="21"
                                        height="21"
                                        viewBox="0 0 21 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="cursor-pointer"
                                    >
                                        <g opacity="0.5">
                                            <path d="M10.5 0.545898C4.98 0.545898 0.5 5.0259 0.5 10.5459C0.5 16.0659 4.98 20.5459 10.5 20.5459C16.02 20.5459 20.5 16.0659 20.5 10.5459C20.5 5.0259 16.02 0.545898 10.5 0.545898ZM10.5 18.5459C6.09 18.5459 2.5 14.9559 2.5 10.5459C2.5 6.1359 6.09 2.5459 10.5 2.5459C14.91 2.5459 18.5 6.1359 18.5 10.5459C18.5 14.9559 14.91 18.5459 10.5 18.5459Z" fill="#A1A1A1" />
                                            <path d="M9.5 5.5459H11.5V7.5459H9.5V5.5459ZM9.5 9.5459H11.5V15.5459H9.5V9.5459Z" fill="#A1A1A1" />
                                        </g>
                                    </svg>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                                <p>{`
                    הגרף מציג את כמות החשמל שיוצר מאנרגיות מתחדשות (שמש, רוח ואחרים) לאורך שנה נבחרת, לפי חודשים.
                    ניתן ללמוד ממנו איך משתנה ייצור החשמל מאנרגיות מתחדשות לאורך השנה, ימים, או חודשים, ומה התרומה של כל סוג טכנולוגיה (רוח, סולארי, אחר) בכל חודש.
                    הנתונים נאספים ממערכת נוגה ומתעדכנים מעת לעת. ניתן לסנן לפי סוג טכנולוגיה ושנה, יום או חודש, ולהוריד את המידע לקובץ אקסל או לגשת אליו דרך API.`}</p>
                            </TooltipContent>
                        </UITooltip>
                    </TooltipProvider>
                </h2>
                <div className="flex items-start md:gap-4 gap-2">
                    <Image src={api} width={32} height={32} className='w-[32px] h-[32px]' alt='image' />
                    <Image src={download} width={32} height={32} className='w-[32px] h-[32px]' alt='image' />
                </div>
            </div>

            {/* Custom Legend positioned above the chart */}
            <div className="flex justify-start gap-6 mb-4">
                {/* Actual */}
                <div
                    className="flex items-center gap-2 cursor-pointer transition-opacity duration-200"
                    onClick={() => toggle("actual")}
                    onMouseEnter={() => setHovered("actual")}
                    onMouseLeave={() => setHovered(null)}
                    style={{ opacity: getLegendOpacity("actual") }}
                >
                    <span
                        className="w-2 h-2 rounded-full transition-opacity duration-200"
                        style={{
                            backgroundColor: "#1E8025",
                            opacity: active.actual ? 1 : 0.3,
                        }}
                    ></span>
                    <span
                        className={`md:text-sm text-xs transition-all duration-200 ${active.actual ? "text-gray-800" : "text-gray-400"
                            }`}
                    >
                        ייצור בפועל
                    </span>
                </div>

                {/* Ministry */}
                <div
                    className="flex items-center gap-2 cursor-pointer transition-opacity duration-200"
                    onClick={() => toggle("ministry")}
                    onMouseEnter={() => setHovered("ministry")}
                    onMouseLeave={() => setHovered(null)}
                    style={{ opacity: getLegendOpacity("ministry") }}
                >
                    <span
                        className="w-2 h-2 rounded-full transition-opacity duration-200"
                        style={{
                            backgroundColor: "#8BBFE1",
                            opacity: active.ministry ? 1 : 0.3,
                        }}
                    ></span>
                    <span
                        className={`md:text-sm text-xs transition-all duration-200 ${active.ministry ? "text-gray-800" : "text-gray-400"
                            }`}
                    >
                        יעד משרד האנרגיה
                    </span>
                </div>

                {/* NZO */}
                <div
                    className="flex items-center gap-2 cursor-pointer transition-opacity duration-200"
                    onClick={() => toggle("nzo")}
                    onMouseEnter={() => setHovered("nzo")}
                    onMouseLeave={() => setHovered(null)}
                    style={{ opacity: getLegendOpacity("nzo") }}
                >
                    <span
                        className="w-2 h-2 rounded-full transition-opacity duration-200"
                        style={{
                            backgroundColor: "#957669",
                            opacity: active.nzo ? 1 : 0.3,
                        }}
                    ></span>
                    <span
                        className={`md:text-sm text-xs transition-all duration-200 ${active.nzo ? "text-gray-800" : "text-gray-400"
                            }`}
                    >
                        יעד NZO
                    </span>
                </div>
            </div>

            <div className="md:h-[500px] h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis unit="%" />
                        <Tooltip content={<CustomTooltip />} />

                        {/* Hide the default legend since we're using our custom one above */}
                        <Legend content={() => null} />

                        {/* Actual */}
                        <Bar
                            dataKey="actual.pct"
                            name="ייצור בפועל"
                            fill={getSeriesColor("actual", "#1E8025")}
                            barSize={28}
                            stackId="a"
                            opacity={opacity("actual")}
                        />
                        <Line
                            type="monotone"
                            dataKey="actual.pct"
                            stroke={getSeriesColor("actual", "#1E8025")}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            name="ייצור בפועל"
                            opacity={opacity("actual")}
                        />

                        {/* Ministry */}
                        <Bar
                            dataKey="ministry.pct"
                            name="יעד משרד האנרגיה"
                            fill={getSeriesColor("ministry", "#8BBFE1")}
                            barSize={28}
                            stackId="a"
                            opacity={opacity("ministry")}
                        />
                        <Line
                            type="monotone"
                            dataKey="ministry.pct"
                            stroke={getSeriesColor("ministry", "#8BBFE1")}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            name="יעד משרד האנרגיה"
                            opacity={opacity("ministry")}
                        />

                        {/* NZO */}
                        <Bar
                            dataKey="nzo.pct"
                            name="יעד NZO"
                            fill={getSeriesColor("nzo", "#957669")}
                            barSize={28}
                            stackId="a"
                            opacity={opacity("nzo")}
                        />
                        <Line
                            type="monotone"
                            dataKey="nzo.pct"
                            stroke={getSeriesColor("nzo", "#957669")}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            name="יעד NZO"
                            opacity={opacity("nzo")}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}