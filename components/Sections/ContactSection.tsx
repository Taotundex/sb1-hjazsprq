'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import topleft from '@/public/images/Ellipse 89 (1).png'


export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="">
      <Image src={topleft} width={600} height={600} className='size-[600px] absolute top-0 left-0 z-1' alt='image' />

      <div className="container mx-auto px-5 py-[52px] relative w-full overflow-hidden z-10">
        <h1 className="text-[45px] font-extrabold text-[#484C56] leading-tight">
          יצירת קשר
        </h1>
        <div className="w-[46px] h-1 bg-[#276E4E] mt-[18px] mr-0"></div>
        <div className="bg-[#FDFBF6] border border-[#DEDEDE]/70 rounded-[40px] overflow-hidden p-10 mt-[30px]">
          {/* <div className="relative z-10 container mx-auto px-4 py-16"> */}
          <div className="flex justify-between items-center">
            {/* Left side - Content */}
            {/* <div className="order-2 lg:order-1 text-right"> */}
            {/* <div className="space-y-8"> */}
            <div>
              <h2 className="text-[34px] font-extrabold text-[#484C56] leading-[110%]">
                לא מצאתם מה שחיפשתם?
                <br />
                <span className='text-[#276E4E]'>יש לכם הצעת שיפור?</span>
              </h2>
              <div className="w-[46px] h-1 bg-[#276E4E] my-5 mr-0"></div>
              <p className="text-[#484C56] text-lg">
                מוזמנים לכתוב לנו ונעשה להשיב במקרום
              </p>
            </div>
            {/* </div> */}
            {/* </div> */}



            {/* Right side - Contact form */}
            {/* <div className="order-1 lg:order-2 bg-[#DEDEDE]/70"> */}
            <div className="bg-white rounded-[20px] p-10 border border-[#E9C863] max-w-[516px] w-full">
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="text-left outline-none placeholder:font-medium placeholder:text-base placeholder:text-[#59687D] !border-b !border-[#59687D]/39 h-10 w-full"
                  placeholder="שם *"
                />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="text-left outline-none placeholder:font-medium placeholder:text-base placeholder:text-[#59687D] !border-b !border-[#59687D]/39 h-10 w-full"
                  placeholder="כתובת דוא״ל *"
                />
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="text-left outline-none placeholder:font-medium placeholder:text-base placeholder:text-[#59687D] !border-b !border-[#59687D]/39 h-10 w-full"
                  placeholder="אזור (אם יש)"
                />
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="text-left outline-none placeholder:font-medium placeholder:text-base placeholder:text-[#59687D] border-b border-[#59687D]/39 min-h-[120px] resize-none w-full"
                  placeholder="כתבו כאן את תוכן הפנייה"
                ></textarea>

                <Button
                  type="submit"
                  className="max-w-[192px] w-full bg-[#1E8025] text-white rounded-full h-10 text-lg font-extrabold"
                >
                  שליחה
                </Button>
              </form>
            </div>
            {/* </div> */}
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}