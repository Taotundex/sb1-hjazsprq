'use client'
import { Button } from '@/components/ui/button';
import InterestPage from '@/components/InterestPage';
import Electricity from '@/components/Electritiy';
import RenewableTargetsSection from '@/components/Sections/RenewableTargetsSection';
import RenewableEnergySection from '@/components/Sections/RenewableEnergySection';
import SolarDashboard from '@/components/SolarDashboard';
import { useState } from 'react';

const page = () => {
    const [activeTab, setActiveTab] = useState<'tab' | 'tab'>();
    const [smpDetails, setSmpDetails] = useState(false)

    const handleTab = (() => {
        setSmpDetails(!smpDetails)
        setActiveTab('tab');
    })

    return (
        <div className="">
            <div className="container mx-auto px-5 md:py-[52px] py-5 md:space-y-[52px] space-y-5 relative w-full overflow-hidden" >
                {/* Main Content */}
                <div className="md:space-y-[52px] space-y-8 bg-[#FDFBF6] border border-[#DEDEDE]/70 md:px-[60px] px-6 md:py-[50px] py-6 md:rounded-[40px] rounded-[20px]">
                    <div className="">
                        <h2 className="md:text-3xl text-2xl font-bold text-[#276E4E]">אקלים</h2>
                        <div className="w-[46px] h-1 bg-[#276E4E] md:my-5 my-3"></div>
                        <div className="flex flex-col gap-2 max-w-[1043px] w-full md:text-xl text-base">
                            <p className="text-[#484C56] max-w-full leading-[120%]">
                                כאן יהיה הסבר.  לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש.                            </p>
                        </div>
                        <Button variant="link" className="text-[#358BFF] mt-2 mr-0 p-0">
                            קרא פחות...
                        </Button>
                    </div>
                    {/* <div className="bg-white border border-[#E9C863] md:rounded-[40px] rounded-[20px] py-10 px-5 space-y-[30px]"> */}
                    {/* <RenewableEnergySection /> */}
                    {/* </div> */}
                </div>

                <div className="md:px-[60px] px-">
                    <h2 className='text-[#276E4E] text-[34px] font-extrabold'>תצוגה יישובית</h2>
                    <label htmlFor='' className='text-[#484C56] text-base font-medium flex items-center gap-4'>שם היישוב:
                        <div className="flex items-center gap-2 rounded-full px-4 pl-3 py-2 border border-[#C3C3C3] w-[200px] transition-all duration-300 hover:border-gray-300" style={{ backgroundColor: '#ffffff' }}>
                            <input
                                type="text"
                                placeholder="תל אביב"
                                className="bg-transparent border-none text-white placeholder-white text-sm focus:outline-none transition-colors duration-200 w-full"
                            />
                            <div className="w-[18px] flex items-center justify-center transition-transform duration-200 hover:scale-110">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.75 15.75L12.4875 12.4875M14.25 8.25C14.25 11.5637 11.5637 14.25 8.25 14.25C4.93629 14.25 2.25 11.5637 2.25 8.25C2.25 4.93629 4.93629 2.25 8.25 2.25C11.5637 2.25 14.25 4.93629 14.25 8.25Z" stroke="#C3C3C3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </label>
                </div>
                <div className="min-h-screen bg-[#FDFBF6] border border-[#DEDEDE]/70 md:rounded-[40px] rounded-[20px] md:px-[60px] px-5 md:py-[50px] py-5 flex flex-col">
                    <SolarDashboard />

                    <div className="flex flex-col gap-2 mt-[52px]">
                        <h2 className='text-[#276E4E] text-xl font-extrabold'>נתונים נוספים:</h2>
                        <button
                            onClick={handleTab}
                            className={`text-[#59687D] font-bold border w-max py-[6px] px-6 rounded-full md:text-base text-sm transition-all ${activeTab === 'tab'
                                ? 'bg-[#1E8025] border-[#1E8025] text-white'
                                : 'bg-white border-[#DEDEDE] hover:bg-gray-50'
                                }`}
                        >
                            פוטנציאל ייצור בחלוקה למחוזות
                        </button>
                    </div>

                    {activeTab === 'tab' && (
                        <div>good</div>
                    )}
                </div>

                {/* Bottom Section - Additional Data Links */}
            </div>

            <InterestPage />
        </div >
    )
}

export default page