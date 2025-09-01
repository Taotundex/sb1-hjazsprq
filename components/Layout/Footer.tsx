import { Button } from '@/components/ui/button';
import Image from 'next/image';
import cofounded from '@/public/images/cofounded.png'
import logoicon from '@/public/images/logoicon.png'
import logo from '@/public/images/logo.png'
import omnis from '@/public/images/omnis_logo1.png'

const footerLinks = [
  { label: 'מקורות נתונים', href: '#data-sources' },
  { label: '|', href: '#' },
  { label: 'אודותינו', href: '#about' },
];

export default function Footer() {
  return (
    <footer className="bg-white relative">
      {/* Quick Links */}
      {/* <div className='relative'>
        <Image src={bottomright} width={250} height={250} className='size-[250px] absolute bottom-0 right-0' alt='image' />
        <div className="container px-5 mx-auto">
          <div className="flex flex-col px-[60px] pb-14">
            <h3 className="text-lg font-extrabold text-[#276E4E]">אולי יעניין אותך גם</h3>
            <div className="w-[46px] h-1 bg-[#276E4E] my-5"></div>
            <div className="grid grid-cols-4 gap-16 relative z-10">
              <div className="bg-white border !border-t-[5px] border-[#C3D44A] border-t-[#1E8025] w-full py-7 px-2 rounded-[5px] text-center flex flex-col gap-5">
                <span className='text-lg text-[#484C56] font-normal text-center'>יתרונות וחסרונות של סוגי<br />  האנרגיה</span>
                <Button variant="link" className="text-[#358BFF] font-bold text-base hover:underline">
                  למאמר <span className='mr-2'>&gt;</span>
                </Button>
              </div>
              <div className="bg-white border !border-t-[5px] border-[#C3D44A] border-t-[#1E8025] w-full py-7 px-2 rounded-[5px] text-center flex flex-col gap-5">
                <span className='text-lg text-[#484C56] font-normal text-center'>דו”ח מצב - משק החשמל <br /> (אשתקד)</span>
                <Button variant="link" className="text-[#358BFF] font-bold text-base hover:underline">
                  הורדת קובץ EXCEL <span className='mr-2'>&gt;</span>
                </Button>
              </div>
              <div className="bg-white border !border-t-[5px] border-[#C3D44A] border-t-[#1E8025] w-full py-7 px-2 rounded-[5px] text-center flex flex-col gap-5">
                <span className='text-lg text-[#484C56] font-normal text-center'>דו”ח מצב - משק האנרגיה <br /> (מ-2017)</span>
                <Button variant="link" className="text-[#358BFF] font-bold text-base hover:underline">
                  הצג דו״ח <span className='mr-2'>&gt;</span>
                </Button>
              </div>
              <div className="bg-white border !border-t-[5px] border-[#C3D44A] border-t-[#1E8025] w-full py-7 px-2 rounded-[5px] text-center flex flex-col gap-5">
                <span className='text-lg text-[#484C56] font-normal text-center'>ביקוש חשמל <br /> - תחזית יומית</span>
                <Button variant="link" className="text-[#358BFF] font-bold text-base hover:underline">
                  הצג דו״ח <span className='mr-2'>&gt;</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Bottom Footer */}
      <div className="border-t-[3px] border-t-[#1E8025] z-10">
        <div className="container bg-white p-5 mx-auto pt-8 ">
          <div className="flex justify-between items-center px-[60px]">
            <div className="flex flex-col items-start justify-between gap-5 mb-4 md:mb-0">
              <nav className="flex flex-row-reverse gap-5">
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-slate-600 hover:text-slate-800 text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <p className='text-base text=[#59687D] font-medium'>© 2025 כל הזכויות שמורות להשל</p>
            </div>



            <div className="flex flex-col items-start text-right gap-5 max-w-[676px]">
              <div className="flex items-center w-full justify-end gap-6">
                <Image src={logo} width={75} height={30} className='' alt='logo' />
                <Image src={logoicon} width={47} height={40} className='' alt='logoicon' />
                <Image src={cofounded} width={120} height={26} className='' alt='cofounded' />
              </div>
              <h3 className='text-[#59687D] text-sm font-medium text-right'>This website was co-funded by the European Union. Its content is the sole responsibility of The Heschel Center for Sustainability, and does not necessarily reflect the views of the European Union.</h3>
              <div className="flex justify-end w-full items-end gap-0 ml-0">
                <Image src={omnis} width={90} height={30} className='' alt='omnis' />
                עיצוב ופיתוח ע״י
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}