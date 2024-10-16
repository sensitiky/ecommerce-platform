import Hero from '@/components/Hero';
import ProductList from '@/components/ProductList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to Our E-commerce Store
      </h1>
      <div className="mb-8">
        <Hero />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <ProductList />
      </div>
      <div className="text-center">
        <Button asChild className="rounded-full">
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    </div>
  );
}
