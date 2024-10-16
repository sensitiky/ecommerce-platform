import Image from 'next/image';

export function HeroImage() {
  return (
    <div className="w-3/4 h-full relative">
      <Image
        src="https://placehold.co/1920x1080.webp"
        alt="Brand Image"
        width={1920}
        height={1080}
        className="rounded-lg"
      />
    </div>
  );
}
