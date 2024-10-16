import { Suspense } from 'react';
import ProductDetails from '@/components/ProductDetails';

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetails id={params.id} />
      </Suspense>
    </div>
  );
}

export async function generateStaticParams() {
  const products = await fetch('http://localhost:3000/api/products').then(res => res.json());
  return products.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
}