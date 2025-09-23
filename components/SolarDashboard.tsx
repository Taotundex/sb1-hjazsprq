"use client";

import React, { useMemo } from "react";

type Props = {
    gaugePercent?: number; // 0-100 (the green arc portion on the semicircle)
    topBarPercent?: number; // percent fill of top (yellow) bar
    bottomBarPercent?: number; // percent fill of bottom (green) bar
    installedKW?: number;
    potentialKW?: number;
    supplyKm?: number; // הספק לקמ"ר
    supplyPerCapita?: number; // הספק לתושב
};

export default function SolarDashboard({
    gaugePercent = 38,
    topBarPercent = 42,
    bottomBarPercent = 18,
    installedKW = 123,
    potentialKW = 123,
    supplyKm = 272.5,
    supplyPerCapita = 272.5,
}: Props) {
    // SVG geometry (fixed px for fidelity with the mock)
    const svgW = 720;
    const svgH = 280;
    const cx = svgW / 2; // 360
    const cy = svgH; // bottom center of semicircle
    const r = 160; // radius of semicircle
    const strokeW = 56; // ring thickness

    // arc length of semicircle (approx)
    const arcLen = Math.PI * r;

    // compute point on semicircle for the gauge percent (for connector)
    const callout = useMemo(() => {
        const p = Math.max(0, Math.min(100, gaugePercent));
        // angle measured from right (0) to left (PI), but our arc goes left->right so
        // angle at percent p (p=0 => left (PI), p=100 => right (0))
        const angle = Math.PI * (1 - p / 100);
        const px = cx + Math.cos(angle) * r;
        const py = cy - Math.sin(angle) * r; // svg Y downwards
        // label offset left/up so it sits above the arc to the left
        const labelX = px - 110;
        const labelY = py - 56;
        // intermediate bend point for connector line
        const midX = px - 36;
        const midY = py - 18;
        return { px, py, midX, midY, labelX, labelY };
    }, [gaugePercent]);

    return (
        <div className="min-h-screen bg-white p-6 flex items-center justify-center" dir="rtl">
            {/* Outer golden rounded card like image */}
            <div className="w-full max-w-6xl rounded-[18px] border-[3px] border-amber-600/60 p-6 bg-white shadow-sm">
                {/* Header */}
                <div className="flex justify-start items-center text-right">
                    <div>
                        <div className="text-[#484C56] font-extrabold text-lg">מימוש פוטנציאל סולארי</div>
                        <div className="text-sm">
                            <span className="text-lg text-[#484C56] font-normal">ביישוב:</span>
                            <span className="text-lg text-[#1E8025] font-semibold mr-1">תל אביב</span>
                        </div>
                    </div>
                </div>

                {/* Gauge + black baseline */}
                <div className="flex justify-center mt-6 border-b-[5px] border-black max-w-[50%] w-full mx-auto">
                    <div className="relative flex justify-center" style={{ width: svgW }}>
                        <div className="absolute flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 mt-10">
                            <h1 className="text-[#484C56] text-[58px] leading-[60px] font-semibold">8%</h1>
                            <p className="text-[#484C56] text-lg font-extrabold">מימוש פוטנציאל</p>
                        </div>
                        <div className="flex flex-row-reverse items-end gap-0">
                            <h5 className="-mr-40 text-[#484C56] text-xl font-extrabold">0%</h5>
                            <svg width={svgW} height={svgH} className="block">
                                {/* background semicircular ring */}
                                <path
                                    d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                                    stroke="#e2e2e2"
                                    strokeWidth={strokeW}
                                    fill="none"
                                    strokeLinecap="butt"
                                />

                                {/* green arc (gauge) */}
                                <path
                                    d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                                    stroke="#4f9b58"
                                    strokeWidth={strokeW}
                                    fill="none"
                                    strokeLinecap="butt"
                                    style={{
                                        strokeDasharray: `${(gaugePercent / 100) * arcLen} ${arcLen}`,
                                    }}
                                />

                                {/* small inner white semicircle to create thicker donut look (optional) */}
                                <circle cx={cx} cy={cy} r={r - strokeW / 2 - 4} fill="#ffffff" />

                                {/* small marker circle where the gauge ends */}
                                <circle cx={callout.px} cy={callout.py} r={8} fill="#4f9b58" stroke="#ffffff" strokeWidth={2} />

                                {/* connector polyline (from arc to label) */}
                                <polyline
                                    points={`${callout.px},${callout.py} ${callout.midX},${callout.midY} ${callout.labelX - 90},${callout.labelY + 38}`}
                                    fill="none"
                                    stroke="#2b7b48"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <h5 className="-ml-40 text-[#484C56] text-xl font-extrabold">100%</h5>
                        </div>

                        {/* Callout label (absolutely positioned over svg) */}
                        <div
                            style={{ left: callout.labelX, top: callout.labelY }}
                            className="absolute text-right"
                        >
                            <div className="flex items-left gap-2">
                                {/* vertical green small tick like in mock */}
                                {/* <span className="block w-0.5 h-4 bg-emerald-700 rounded-sm" /> */}
                                <div className="font-semibold text-gray-700 text-base -ml-16 mt-3">ממוצע ארצי (38%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content area under gauge: left = progress bars, right = status cards */}
                <div className="w-full mt-10 grid grid-cols-2 gap-10 items-center">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[#484C56] font-extrabold text-xl">סטטוס יישובי</h3>
                        {/* Right: two rounded status cards */}
                        <div className=" flex md:flex-row flex-col gap-6">
                            <div className="w-full px-4 py-[10px] rounded-[20px] border border-[#C3C3C3] bg-white text-right">
                                <div className="text-[#484C56] text-base font-normal">סך פוטנציאל הקמה</div>
                                <div className="text-2xl text-[#484C56] font-extrabold mt-2 text-[34px]">{potentialKW} <span className="text-xl font-bold">קילוואט</span></div>
                            </div>

                            <div className="w-full px-4 py-[10px] rounded-[20px] border border-[#C3C3C3] bg-white text-right">
                                <div className="text-[#484C56] text-base font-normal">סך הספק מותקן</div>
                                <div className="text-2xl text-[#484C56] font-extrabold mt-2 text-[34px]">{installedKW} <span className="text-xl font-bold">קילוואט</span></div>
                            </div>
                        </div>
                    </div>


                    {/* Left: progress bars & title */}
                    <div className="">
                        <div className="text-gray-700 text-center font-semibold text-lg">ממוצע ארצי</div>
                        <div className="h-4 w-[2px] bg-[#2F7A4F] mx-auto my-2"></div>

                        {/* first bar */}
                        <div className="mb-6">
                            <div className="flex justify-center gap-1 items-baseline">
                                <div className="text-gray-700 font-semibold">הספק לקמ"ר: <span className="font-bold">{supplyKm}</span></div>
                                <div className="text-gray-400 text-sm">(מגהוואט/קמ"ר)</div>
                            </div>

                            <div className="relative mt-3 h-4 bg-gray-200 shadow-inner rounded-full overflow-hidden">
                                <div
                                    className="absolute left-0 top-0 h-4 rounded-full"
                                    style={{ width: `${topBarPercent}%`, background: "#E9AE00" }}
                                />

                                {/* vertical tick for average (aligned to gauge percent) */}
                                <div
                                    className="absolute top-[-6px] left-1/2 h-16"
                                    style={{ width: 0 }}
                                // style={{ left: `${gaugePercent}%`, width: 0 }}
                                >
                                    <div className="w-[2px] h-16 bg-[#2F7A4F] mx-auto" />
                                </div>

                                {/* gray remainder is already represented by bg-gray-200 */}
                            </div>
                        </div>

                        {/* second bar */}
                        <div className="mb-2">
                            <div className="flex justify-center gap-1 items-baseline">
                                <div className="text-gray-700 font-semibold">הספק לתושב: <span className="font-bold">{supplyPerCapita}</span></div>
                                <div className="text-gray-400 text-sm">(קילוואט/תושב)</div>
                            </div>

                            <div className="relative mt-3 h-4 bg-gray-200 shadow-inner rounded-full overflow-hidden">
                                <div
                                    className="absolute left-0 top-0 h-4 rounded-full"
                                    style={{ width: `${bottomBarPercent}%`, background: "#A7BF56" }}
                                />

                                {/* same vertical tick shared by both bars */}
                                <div
                                    className="absolute top-[-6px] left-1/2 h-16"
                                    style={{ width: 0 }}
                                // style={{ left: `${gaugePercent}%`, width: 0 }}
                                >
                                    <div className="w-[2px] h-16 bg-[#2F7A4F] mx-auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
