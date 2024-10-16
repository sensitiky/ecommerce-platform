import { NextResponse } from 'next/server';

const products = [
  { id: 1, name: 'Product 1', price: 19.99, image: 'https://source.unsplash.com/random/300x300?product' },
  { id: 2, name: 'Product 2', price: 29.99, image: 'https://source.unsplash.com/random/300x300?gadget' },
  { id: 3, name: 'Product 3', price: 39.99, image: 'https://source.unsplash.com/random/300x300?electronics' },
  { id: 4, name: 'Product 4', price: 49.99, image: 'https://source.unsplash.com/random/300x300?tech' },
];

export async function GET() {
  return NextResponse.json(products);
}