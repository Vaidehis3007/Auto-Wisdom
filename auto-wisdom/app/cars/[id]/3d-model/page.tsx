import Link from 'next/link';
import CarViewer from '@/components/CarViewer';

export default async function Car3DModel({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/cars/${params.id}`);
  const car = await params;

  if (!car || res.status === 404) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-red-600">Car not found!</h1>
        <Link
          href="/browse"
          className="mt-4 inline-block px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          Back to Browse Cars
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/browse">
        <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors">
          Back to Browse Cars
        </button>
      </Link>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">3D Model Viewer</h2>
        <div className="h-[600px] w-full">
          <CarViewer modelId={car.modelId} />
        </div>
      </div>
    </div>
  );
}