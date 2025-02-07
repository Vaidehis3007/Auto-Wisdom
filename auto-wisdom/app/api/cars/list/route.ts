import { NextResponse } from 'next/server';

const cars = [
  {
    id: 1,
    name: 'BMW 3 Series',
    description: 'Luxury sedan with advanced features.',
    basePrice: 41250,
    discount: 1750,
    estimatedTax: 3300,
    documentationFee: 500,
    imageUrl: '/images/bmw-3-series.jpg',
  },
  {
    id: 2,
    name: 'Tesla Model S',
    description: 'Electric luxury sedan with autopilot.',
    basePrice: 80000,
    discount: 2000,
    estimatedTax: 6400,
    documentationFee: 1000,
    imageUrl: '/images/tesla-model-s.jpg',
  },
  {
    id: 3,
    name: 'Ford Mustang',
    description: 'Reliable and efficient sedan.',
    basePrice: 30000,
    discount: 1000,
    estimatedTax: 2400,
    documentationFee: 300,
    imageUrl: '/images/ford-mustang.jpg',
  },
];

export async function GET() {
  return NextResponse.json(cars);
}