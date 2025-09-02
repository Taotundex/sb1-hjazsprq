import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import bottomright from '@/public/images/Ellipse 891.png'

const InterestPage = () => {
    return (
        <div>
            <div className='relative'>
                <Image src={bottomright} width={250} height={250} className='size-[250px] absolute bottom-0 right-0' alt='image' />
                <div className="container px-5 mx-auto">
                    <div className="flex flex-col px-[60px] pb-14">
                        <div className="flex justify-between items-center px-2">
                            <h3 className="text-lg font-extrabold text-[#276E4E]">אולי יעניין אותך גם</h3>
                            <div className="flex gap-5">
                                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 0.545898L11.59 1.9559L16.17 6.5459H0V8.5459H16.17L11.58 13.1359L13 14.5459L20 7.5459L13 0.545898Z" fill="#A1A1A1" />
                                </svg>
                                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 14.5459L8.41 13.1359L3.83 8.5459H20V6.5459H3.83L8.42 1.9559L7 0.545898L0 7.5459L7 14.5459Z" fill="#484C56" />
                                </svg>
                            </div>
                        </div>
                        <div className="w-[46px] h-1 bg-[#276E4E] my-5"></div>
                        <div className="grid grid-cols-4 gap-16 relative z-10">
                            <div className="bg-white border !border-t-[5px] border-[#C3D44A] border-t-[#1E8025] w-full pt-6 pb-2 px-2 rounded-[5px] text-center flex flex-col gap-5" style={{ boxShadow: '0px 3px 30px 0px #99BF4129' }}>
                                <span className='text-lg text-[#484C56] font-normal text-center'>יתרונות וחסרונות של סוגי<br />  האנרגיה</span>
                                <Button variant="link" className="text-[#358BFF] font-bold text-base hover:underline">
                                    למאמר <span className='mr-2'>&gt;</span>
                                </Button>
                            </div>
                            <div className="bg-white border !border-t-[5px] border-[#C3D44A] border-t-[#1E8025] w-full pt-6 pb-2 px-2 rounded-[5px] text-center flex flex-col gap-5" style={{ boxShadow: '0px 3px 30px 0px #99BF4129' }}>
                                <span className='text-lg text-[#484C56] font-normal text-center'>דו”ח מצב - משק החשמל <br /> (אשתקד)</span>
                                <Button variant="link" className="text-[#358BFF] font-bold text-base hover:underline">
                                    הורדת קובץ EXCEL <span className='mr-2'>&gt;</span>
                                </Button>
                            </div>
                            <div className="bg-white border !border-t-[5px] border-[#C3D44A] border-t-[#1E8025] w-full pt-6 pb-2 px-2 rounded-[5px] text-center flex flex-col gap-5" style={{ boxShadow: '0px 3px 30px 0px #99BF4129' }}>
                                <span className='text-lg text-[#484C56] font-normal text-center'>דו”ח מצב - משק האנרגיה <br /> (מ-2017)</span>
                                <Button variant="link" className="text-[#358BFF] font-bold text-base hover:underline">
                                    הצג דו״ח <span className='mr-2'>&gt;</span>
                                </Button>
                            </div>
                            <div className="bg-white border !border-t-[5px] border-[#C3D44A] border-t-[#1E8025] w-full pt-6 pb-2 px-2 rounded-[5px] text-center flex flex-col gap-5" style={{ boxShadow: '0px 3px 30px 0px #99BF4129' }}>
                                <span className='text-lg text-[#484C56] font-normal text-center'>ביקוש חשמל <br /> - תחזית יומית</span>
                                <Button variant="link" className="text-[#358BFF] font-bold text-base hover:underline">
                                    הצג דו״ח <span className='mr-2'>&gt;</span>
                                </Button>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </div >
    )
}

export default InterestPage