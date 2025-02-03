import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Car {
  id: string;
  name: string;
  price: string;
  image: string;
}

async function getCarDetails(id: string): Promise<Car | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/cars/${id}`);
    if (!res.ok) throw new Error('Car not found');
    return res.json();
  } catch {
    notFound();
  }
}

export default async function CarDetailsPage({ params }: {params: {id: string}}) {
  const car = await getCarDetails(params.id);
  if (!car) return notFound();

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <Card className="p-6">
        <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
        <img src={car.image} alt={car.name} className="w-1/2 mx-auto rounded-lg shadow-lg mb-4" />
        <p className="text-xl font-semibold">{car.price}</p>
      </Card>

      <Link 
        href="/browse"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Browse
      </Link>
    </div>
  );
}
