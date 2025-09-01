import Image from 'next/image';

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <div 
      className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
      onClick={onClick}
    >
      <Image
        src="/Frame 427319881.png"
        alt="NZO Logo"
        width={80}
        height={40}
        className="h-10 w-auto"
        priority
      />
    </div>
  );
}