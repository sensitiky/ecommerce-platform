import { NextResponse } from 'next/server';

const products = [
  { id: 1, name: 'Product 1', price: 19.99, image: 'https://source.unsplash.com/random/500x500?product', description: 'This is a detailed description of Product 1.' },
  { id: 2, name: 'Product 2', price: 29.99, image: 'https://source.unsplash.com/random/500x500?gadget', description: 'This is a detailed description of Product 2.' },
  { id: 3, name: 'Product 3', price: 39.99, image: 'https://source.unsplash.com/random/500x500?electronics', description: 'This is a detailed description of Product 3.' },
  { id: 4, name: 'Product 4', price: 49.99, image: 'https://source.unsplash.com/random/500x500?tech', description: 'This is a detailed description of Product 4.' },
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const product = products.find(p => p.id === id);

  if (product) {
    return NextResponse.json(product);
  } else {
    return new NextResponse('Product not found', { status: 404 });
  }
}