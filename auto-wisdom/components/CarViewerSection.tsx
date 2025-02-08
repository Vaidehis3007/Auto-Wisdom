'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/LoadingSpinner';

const CarViewer = dynamic(() => import('@/components/CarViewer'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

interface CarViewerSectionProps {
  modelId: string; 
}

export default function CarViewerSection({modelId }: CarViewerSectionProps) {
  return (
    <div className="mt-12 bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Featured Car - 3D View</h2>
      <div className="h-[400px] w-full">
        <Suspense fallback={<LoadingSpinner />}>
          <CarViewer modelId={modelId}/>
        </Suspense>
      </div>
    </div>
  );
}