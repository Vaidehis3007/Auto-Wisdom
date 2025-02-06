import Link from 'next/link';

export default async function CarDetails({ params }: { params: { id: string } }) {
  const { id } = params;

 
  const cars = [
    { id: 1,
      name: 'BMW 3 Series',
      description: 'Luxury sedan with advanced features.',
      basePrice: '$41,250',
      discount: '$1,750',
      estimatedTax: '$3,300',
      documentationFee: '$500',
      imageUrl: './images/bmw.jpg' },
    { id: 2,
      name: 'Tesla Model S',
      description: 'Electric luxury sedan with autopilot.',
      basePrice: '$80,000',
      discount: '$2,000',
      estimatedTax: '$6,400',
      documentationFee: '$1,000',
      imageUrl: './images/tesla.jpg' },
    { id: 3,
      name: 'Ford Mustang',
      description: 'Reliable and efficient sedan.',
      basePrice: '$30,000',
      discount: '$1,000',
      estimatedTax: '$2,400',
      documentationFee: '$300',
      imageUrl: './images/ford.jpg'},
  ];

  
  const car = cars.find((car) => car.id === parseInt(id));

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-red-600">Car not found!</h1>
        <Link
          href="/browse"
          className="mt-4 inline-block px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          Back to Cars
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-teal-700 mb-8">{car.name}</h1>
      <p className="text-xl text-gray-600">{car.description}</p>
      <p className="mt-4 text-2xl font-bold text-green-600">{car.basePrice}</p>
      <div className="mt-8">
        <Link
          href="/browse"
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
        >
          Back to Cars
        </Link>
      </div>
    </main>
  );
}
