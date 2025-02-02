import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import LoadingSpinner from '@/components/LoadingSpinner'

async function getCarDetails(id: string) {
  // In a real app, this would be an API call
  const car = await fetch(`/api/cars/${id}`)
  if (!car) notFound()
  return car
}

export default async function CarDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingSpinner />}>
        <CarDetails id={params.id} />
      </Suspense>
      <Link 
        href="/cars"
        className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Cars
      </Link>
    </div>
  )
}

async function CarDetails({ id }: { id: string }) {
  const car = await getCarDetails(id)
  
  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
      {/* Car details content */}
    </Card>
  )
}
