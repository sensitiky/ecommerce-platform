'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ArrowUp, ArrowRight } from 'lucide-react';

export function HeroContent() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div
      className="w-1/4 flex flex-col justify-between items-center text-center relative bg-cover bg-center rounded-lg ml-2"
      style={{
        backgroundImage: "url('https://placehold.co/1920x1080.webp')",
      }}
    >
      <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0 rounded-lg"></div>
      <div className="relative z-10 p-8 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Discover Our Latest Collection
        </h1>
        <p className="text-xl mb-8 text-white">
          Find the best products for your needs
        </p>
        <Button asChild className="rounded-full mb-4">
          <Link href="/products">Go Shopping</Link>
        </Button>
      </div>
      <div
        className={`mb-2 transition-opacity duration-500 z-50 overflow-hidden w-auto mx-auto ${
          showSearch ? 'opacity-100' : 'opacity-0'
        } `}
      >
        <Input
          type="text"
          placeholder="Search..."
          className="mt-2 p-2 rounded-full "
        />
      </div>
      <div
        className="relative z-10 text-lg cursor-pointer text-white mb-4 flex flex-row items-center"
        onClick={() => setShowSearch(!showSearch)}
      >
        Search in the store
        {showSearch ? <ArrowUp /> : <ArrowRight />}
      </div>
    </div>
  );
}
