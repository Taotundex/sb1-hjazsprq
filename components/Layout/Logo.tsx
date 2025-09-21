import Image from 'next/image';



export default function Logo() {
  return (
    <div
      className="flex items-center cursor-pointer"
    >
      <Image
        src="/Frame 427319881.png"
        alt="NZO Logo"
        width={163}
        height={65}
        className="h-[65px] w-[163px]"
        priority
      />
    </div>
  );
}