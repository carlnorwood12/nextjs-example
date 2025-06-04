import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image src="/nextjs.svg" alt="Next.js Logo" width={40} height={40} />
    </div>
  );
}
