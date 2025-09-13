'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LineChart from '@/components/Charts/LineChart';
import PieChart from '@/components/Charts/PieChart';
import NewsletterPopup from '@/components/NewsletterPopup';
import { Download, Info, BarChart3, ChevronLeft, ChevronRight, ExternalLink, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import topleft from '@/public/images/Ellipse 89.png'
import image1 from '@/public/Frame 427319915.png'
import image2 from '@/public/Frame 427319913.png'
import image3 from '@/public/Frame 427319914.png'
import download from '@/public/images/download_2.png'
import api from '@/public/images/API.png'
import InterestPage from '@/components/InterestPage';


export default function ElectricitySector() {
    const [selectedTimeframe, setSelectedTimeframe] = useState('יומי');

    // Data for electricity consumption line chart - matching Figma design
    const electricityData = {
        dates: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
        series: [
            {
                name: 'אחר',
                data: [1000, 800, 600, 500, 400, 300, 200, 150, 200, 400, 600, 800, 1000],
                color: '#64748b'
            },
            {
                name: 'אנרגיות מתחדשות',
                data: [0, 0, 0, 200, 800, 1200, 1600, 1800, 1600, 1200, 800, 200, 0],
                color: '#10b981'
            },
            {
                name: 'אנרגיות פוסיליות',
                data: [7500, 7000, 6500, 6000, 5500, 5000, 4500, 4000, 4500, 5500, 6500, 7000, 7500],
                color: '#f59e0b'
            }
        ]
    };

    // Data for energy sources pie chart - matching Figma design
    const energySourcesData = [
        { name: 'אנרגיות פוסיליות', value: 48, color: '#CEA073' },
        { name: 'אנרגיות מתחדשות', value: 98, color: '#2F7A4F' },
        { name: 'אחר', value: 34, color: '#648AA3' },
    ];


    return (
        <div className="">
            <div className="container mx-auto px-5 py-[52px] space-y-[52px] relative w-full overflow-hidden" >
                {/* Main Content */}
                <div className="space-y-[52px] bg-[#FDFBF6] border border-[#DEDEDE]/70 px-[60px] py-[50px] rounded-[40px]">
                    <div className="">
                        <h2 className="text-3xl font-bold text-[#276E4E]">משק החשמל בישראל</h2>
                        <div className="w-[46px] h-1 bg-[#276E4E] my-5"></div>
                        <div className="flex flex-col gap-2 max-w-[1043px]">
                            <p className="text-[#484C56] max-w-full leading-[120%]">
                                משק החשמל בישראל מורכב ממספר גורמים מרכזיים: משרד האנרגיה, האחראי על קביעת מדיניות האנרגיה, רשות החשמל, המפקחת על השוק וקובעת את התעריפים, וחברת נגה – ניהול מערכת החשמל, המנהלת את אספקת החשמל ושומרת על איזון בין ביקוש לייצור בזמן אמת.
                            </p>
                        </div>
                        <Button variant="link" className="text-[#358BFF] mt-2 mr-0 p-0">
                            קרא עוד...
                        </Button>
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Energy Sources Pie Chart */}
                        <Card className="bg-white border border-orange-200 rounded-2xl shadow-sm">
                            <CardHeader>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg text-right flex flex-row-reverse items-center gap-2 text-[#484C56] font-extrabold">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.5">
                                                    <path d="M10.5 0.545898C4.98 0.545898 0.5 5.0259 0.5 10.5459C0.5 16.0659 4.98 20.5459 10.5 20.5459C16.02 20.5459 20.5 16.0659 20.5 10.5459C20.5 5.0259 16.02 0.545898 10.5 0.545898ZM10.5 18.5459C6.09 18.5459 2.5 14.9559 2.5 10.5459C2.5 6.1359 6.09 2.5459 10.5 2.5459C14.91 2.5459 18.5 6.1359 18.5 10.5459C18.5 14.9559 14.91 18.5459 10.5 18.5459Z" fill="#A1A1A1" />
                                                    <path d="M9.5 5.5459H11.5V7.5459H9.5V5.5459ZM9.5 9.5459H11.5V15.5459H9.5V9.5459Z" fill="#A1A1A1" />
                                                </g>
                                            </svg>
                                            תמהיל יצור אנרגיה
                                        </CardTitle>
                                        <div className="flex items-start gap-4">
                                            <Image src={api} width={32} height={32} className='w-[32px] h-[32px]' alt='image' />
                                            <Image src={download} width={32} height={32} className='w-[32px] h-[32px]' alt='image' />
                                        </div>
                                    </div>
                                    <div className="text-sm text-slate-600 mr-[90px]">פרק זמן:</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="-mt-4 flex items-center gap-4">
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
                                <div className="relative">
                                    <PieChart
                                        data={energySourcesData}
                                        height={450}
                                        innerRadius="50%"
                                        showLabels={false}
                                    />
                                    {/* Center text */}
                                    <div className="absolute top-[-30%] inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-sm text-slate-600 text-center">סה"כ</div>
                                            <div className="text-base font-bold">MW 5,734</div>
                                        </div>
                                    </div>
                                    {/* Label with percentage */}
                                    {/* <div className="absolute top-16 right-16 bg-orange-100 px-2 py-1 rounded text-xs">
                    38% | אנרגיות פוסיליות
                  </div> */}
                                </div>

                                {/* Legend */}
                                <div className="-mt-32 flex flex-row-reverse justify-end gap-6 text-xs font-medium">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                        <span className='text-sm'>אחר</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className='text-sm'>אנרגיות מתחדשות</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                        <span className='text-sm'>אנרגיות פוסיליות</span>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-start">
                                    <Button variant="link" className="text-blue-600 text-sm">
                                        הצג נתונים <ChevronLeft className="w-4 h-4 mr-1" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Electricity Consumption Line Chart */}
                        <Card className="bg-white border border-orange-200 rounded-2xl shadow-sm">
                            <CardHeader>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg text-right flex flex-row-reverse items-center gap-2 text-[#484C56] font-extrabold">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.5">
                                                    <path d="M10.5 0.545898C4.98 0.545898 0.5 5.0259 0.5 10.5459C0.5 16.0659 4.98 20.5459 10.5 20.5459C16.02 20.5459 20.5 16.0659 20.5 10.5459C20.5 5.0259 16.02 0.545898 10.5 0.545898ZM10.5 18.5459C6.09 18.5459 2.5 14.9559 2.5 10.5459C2.5 6.1359 6.09 2.5459 10.5 2.5459C14.91 2.5459 18.5 6.1359 18.5 10.5459C18.5 14.9559 14.91 18.5459 10.5 18.5459Z" fill="#A1A1A1" />
                                                    <path d="M9.5 5.5459H11.5V7.5459H9.5V5.5459ZM9.5 9.5459H11.5V15.5459H9.5V9.5459Z" fill="#A1A1A1" />
                                                </g>
                                            </svg>
                                            משק החשמל בישראל - נתב על
                                        </CardTitle>
                                        <div className="flex items-start gap-4">
                                            <Image src={api} width={32} height={32} className='w-[32px] h-[32px]' alt='image' />
                                            <Image src={download} width={32} height={32} className='w-[32px] h-[32px]' alt='image' />
                                        </div>
                                    </div>
                                    <div className="text-sm text-slate-600 mr-[90px]">פרק זמן:</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4 -mt-4 flex items-center gap-4">
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
                                <LineChart
                                    data={electricityData}
                                    yAxisLabel="[MW]"
                                    height={300}
                                />
                                {/* Legend */}
                                <div className="-mt-0 flex flex-row-reverse justify-end gap-6 text-xs font-medium">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                        <span className='text-sm'>אחר</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className='text-sm'>אנרגיות מתחדשות</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                        <span className='text-sm'>אנרגיות פוסיליות</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-start">
                                    <Button variant="link" className="text-blue-600 text-sm">
                                        הצג נתונים <ChevronLeft className="w-4 h-4 mr-1" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>


                {/* Bottom Section - Additional Data Links */}
                <div className="bg-[#FDFBF6] border border-[#DEDEDE]/70 rounded-[40px] px-[60px] space-y-[30px]">
                    <div className="flex flex-col gap-2 my-[30px]">
                        <h3 className="text-lg font-extrabold text-[#276E4E]">לנתונים נוספים</h3>
                        <div className="flex items-center gap-6">
                            <Button variant="link" className="text-[#59687D] font-bold border border-[#DEDEDE] bg-white py-[6px] space-x-[22px] rounded-full text-base hover:underline">
                                שוק חשמל תחרותי
                            </Button>
                            <Button variant="link" className="text-[#59687D] font-bold border border-[#DEDEDE] bg-white py-[6px] space-x-[22px] rounded-full text-base hover:underline">
                                SMP
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <InterestPage />
        </div >
    );
}