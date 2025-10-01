"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
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
    Legend,
    LabelList,
} from "recharts";
import { ChevronDown } from "lucide-react";

type DataPoint = {
    month: string;
    total: number; // small numbers like in the image above each bar (17,12,...)
    other: number;
    solar: number;
    wind: number;
    // optional MW estimates for tooltip clarity
    otherMW?: number;
    solarMW?: number;
    windMW?: number;
};

const data: DataPoint[] = [
    { month: "01/24", total: 17, other: 7, solar: 3, wind: 7, otherMW: 3500, solarMW: 1500, windMW: 3500 },
    { month: "02/24", total: 12, other: 5, solar: 3, wind: 4, otherMW: 2500, solarMW: 1400, windMW: 1200 },
    { month: "03/24", total: 14, other: 6, solar: 4, wind: 4, otherMW: 2800, solarMW: 1600, windMW: 1400 },
    { month: "04/24", total: 12, other: 5, solar: 4, wind: 3, otherMW: 2600, solarMW: 1800, windMW: 1200 },
    { month: "05/24", total: 12, other: 6, solar: 4, wind: 2, otherMW: 5537, solarMW: 4537, windMW: 3469 }, // tooltip example values visible in image
    { month: "06/24", total: 13, other: 6, solar: 3, wind: 4, otherMW: 3000, solarMW: 1400, windMW: 2600 },
    { month: "07/24", total: 15, other: 7, solar: 4, wind: 4, otherMW: 3200, solarMW: 1700, windMW: 2800 },
    { month: "08/24", total: 19, other: 9, solar: 5, wind: 5, otherMW: 4200, solarMW: 2100, windMW: 3200 },
    { month: "09/24", total: 19, other: 9, solar: 5, wind: 5, otherMW: 4200, solarMW: 2100, windMW: 3200 },
    { month: "10/24", total: 27, other: 12, solar: 7, wind: 8, otherMW: 6000, solarMW: 2600, windMW: 3200 },
    { month: "11/24", total: 31, other: 13, solar: 9, wind: 9, otherMW: 6800, solarMW: 3600, windMW: 3600 },
    { month: "12/24", total: 37, other: 15, solar: 11, wind: 11, otherMW: 9000, solarMW: 5400, windMW: 6000 },
];

const series = [
    { key: "other", label: "אחר", color: "#2F6497" }, // blue-ish (matches image)
    { key: "solar", label: "סולארי", color: "#F1C40F" }, // yellow
    { key: "wind", label: "רוח", color: "#7BC94A" }, // green
];

// custom tooltip to match the screenshot style
const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || payload.length === 0) return null;

    // find payload entries by dataKey (bars will come in reverse stack order sometimes)
    const byKey = new Map<string, any>();
    payload.forEach((p: any) => {
        // p.dataKey is like "wind" or "solar" or "other"
        byKey.set(p.dataKey, p);
    });

    // compute total MW if MW present, else compute sum of numeric values
    const payloadPoint = payload[0]?.payload;
    const totalMW =
        (payloadPoint.windMW || 0) + (payloadPoint.solarMW || 0) + (payloadPoint.otherMW || 0);

    return (
        <div className="rounded-lg shadow-xl border border-[#DEDEDE] bg-white p-4 min-w-[140px] text-sm">
            <div className="text-xs text-gray-500 mb-2">{label}</div>
            <div className="md:text-base text-sm font-medium mb-3 border-b border-[#707585]">{totalMW ? `${totalMW.toLocaleString()} MW` : `סה״כ ${payloadPoint.total}`}</div>

            {series.map((s) => {
                const val = payloadPoint[s.key];
                const mwKey = `${s.key}MW` as keyof typeof payloadPoint;
                return (
                    <div key={s.key} className="flex items-center gap-3 mb-1">
                        <span style={{ background: s.color }} className="w-2 h-2 rounded-full block" />
                        <div className="flex-1">
                            <div className="text-xs text-gray-600">{s.label}</div>
                            <div className="text-sm font-medium">
                                {payloadPoint[mwKey] ? `${payloadPoint[mwKey].toLocaleString()} MW` : ""}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default function RenewableProduction() {
    // activeSeries indicates which legend item is hovered (null = all visible)
    const [activeSeries, setActiveSeries] = useState<string | null>(null);

    // create a memoized style mapper that dims un-active series
    const opacityForKey = (key: string) => (activeSeries && activeSeries !== key ? 0.18 : 1);

    // a small helper to render the right-side vertical legeRenewableProductionnd
    const CustomRightLegend = () => (
        <div className="flex flex-col gap-4 items-start p-4">
            {series.map((s) => (
                <div
                    key={s.key}
                    onMouseEnter={() => setActiveSeries(s.key)}
                    onMouseLeave={() => setActiveSeries(null)}
                    className="flex items-center gap-3 cursor-pointer select-none"
                >
                    <span
                        style={{
                            background: s.color,
                            opacity: activeSeries && activeSeries !== s.key ? 0.3 : 1,
                        }}
                        className="w-3 h-3 rounded-full inline-block"
                    />
                    <div className="text-sm">{s.label}</div>
                </div>
            ))}
        </div>
    );

    // since Recharts' legend is not used, we construct layout: chart left, legend right
    return (
        <div className="bg-white border border-[#E9C863] md:rounded-[40px] rounded-[20px] p-6">
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2 mb-3">
                    <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        תחמ״ל ייצור אנרגיות מתחדשות
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.5">
                                <path d="M10.5 0.545898C4.98 0.545898 0.5 5.0259 0.5 10.5459C0.5 16.0659 4.98 20.5459 10.5 20.5459C16.02 20.5459 20.5 16.0659 20.5 10.5459C20.5 5.0259 16.02 0.545898 10.5 0.545898ZM10.5 18.5459C6.09 18.5459 2.5 14.9559 2.5 10.5459C2.5 6.1359 6.09 2.5459 10.5 2.5459C14.91 2.5459 18.5 6.1359 18.5 10.5459C18.5 14.9559 14.91 18.5459 10.5 18.5459Z" fill="#A1A1A1" />
                                <path d="M9.5 5.5459H11.5V7.5459H9.5V5.5459ZM9.5 9.5459H11.5V15.5459H9.5V9.5459Z" fill="#A1A1A1" />
                            </g>
                        </svg>
                    </h2>
                    <p className="mr-14">פרק זמן:</p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">מיון לפי:</span>
                        <div className="relative w-[202px]">
                            <select
                                className="w-full border rounded-full px-3 py-1 text-xs h-8 appearance-none bg-white pr-6"
                            >
                                <option>יומי</option>
                                <option>שבועי</option>
                                <option>חודשי</option>
                            </select>

                            {/* Custom dropdown arrow */}
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black text-xs">
                                <ChevronDown size={14} />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-start md:gap-4 gap-2">
                    <Image src={api} width={32} height={32} className='w-[32px] h-[32px]' alt='image' />
                    <Image src={download} width={32} height={32} className='w-[32px] h-[32px]' alt='image' />
                </div>
            </div>

            <div className="flex gap-4">
                {/* legend at the right side */}
                <div className="w-40 flex-shrink-0">
                    <CustomRightLegend />
                </div>
                {/* chart area */}
                <div className="flex-1 md:h-[420px] h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
                            <CartesianGrid vertical={false} strokeDasharray="6 6" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip content={<CustomTooltip />} />
                            {/* Bars (stacked): order matters for stack visual */}
                            <Bar
                                dataKey="other"
                                stackId="a"
                                fill={series[0].color}
                                radius={[0, 0, 0, 0]}
                                barSize={28}
                                opacity={opacityForKey("other")}
                            />
                            <Bar
                                dataKey="solar"
                                stackId="a"
                                fill={series[1].color}
                                radius={[0, 0, 0, 0]}
                                barSize={28}
                                opacity={opacityForKey("solar")}
                            />
                            <Bar
                                dataKey="wind"
                                stackId="a"
                                fill={series[2].color}
                                radius={[4, 4, 0, 0]}
                                barSize={28}
                                opacity={opacityForKey("wind")}
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
            </div>
        </div>
    );
}
