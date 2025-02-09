import Link from 'next/link';
import CarViewer from '@/components/CarViewer';
import { ArrowLeft } from 'lucide-react';

export default async function Car3DModel({ params }: { params: { id: string } }) {
  if (!params?.id) {
    return <div>Invalid parameters</div>;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/cars/${params.id}`);
    
    if (!res.ok) {
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

    const car = await res.json();

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
        <Link
          href="/browse"
          className="flex items-center text-teal-500 hover:text-teal-600 transition-colors"
        >
          <ArrowLeft className="mr-2" /> 
          <span>Back to Browse Cars</span>
        </Link>
      </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">3D Model Viewer</h2>
          <div className="w-full max-w-4xl mx-auto aspect-video">
            <CarViewer modelId={car.modelId} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching car data:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-red-600">Error loading car data</h1>
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
}
