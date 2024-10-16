"use client";

import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">E-commerce Store</Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/products" className="hover:text-primary">Products</Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-primary">
                <ShoppingCart className="w-6 h-6" />
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-primary">
                <User className="w-6 h-6" />
              </Link>
            </li>
            <li>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}