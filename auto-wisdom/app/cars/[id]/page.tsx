import Link from 'next/link';
import CarViewerSection from '@/components/CarViewerSection';
import { ArrowLeft } from 'lucide-react';

export default async function CarDetails({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/cars/${params.id}`);
  const car = await res.json();

  if (!car || res.status === 404) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-red-600">Car not found!</h1>
        <div className="mb-8">
        <Link
          href="/browse"
          className="flex items-center text-teal-500 hover:text-teal-600 transition-colors"
        >
          <ArrowLeft className="mr-2" /> 
          <span>Back to Browse Cars</span>
        </Link>
      </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-teal-700 mb-8">{car.name}</h1>
      <p className="text-xl text-gray-600">{car.description}</p>
      <p className="mt-4 text-2xl font-bold text-green-600">{car.basePrice}</p>
      {car.modelId && <CarViewerSection modelId={car.modelId} />}
      <div className="mt-8 space-x-4">
      <div className="mb-8">
        <Link
          href="/browse"
          className="flex items-center text-teal-500 hover:text-teal-600 transition-colors"
        >
          <ArrowLeft className="mr-2" /> 
          <span>Back to Browse Cars</span>
        </Link>
      </div>
        <Link
          href={`/cars/${params.id}/3d-model`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Explore 3D Model
        </Link>
      </div>
    </main>
  );
}