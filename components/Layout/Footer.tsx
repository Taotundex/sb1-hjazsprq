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
    <footer className="bg-[#FDFBF6] relative">
      {/* Bottom Footer */}
      <div className="border-t-[3px] border-t-[#1E8025] z-10">
        <div className="container bg-[#FDFBF6] p-5 mx-auto pt-8 ">
          <div className="flex justify-between px-[60px]">
            <div className="flex flex-col items-start justify-between h-auto gap-5 mb-4 md:mb-0">
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
                עיצוב ופיתוח ע״י
                <Image src={omnis} width={90} height={30} className='' alt='omnis' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}