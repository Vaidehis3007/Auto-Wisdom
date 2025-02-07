'use client'; 
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function BrowsePage() {
  const [selectedCar, setSelectedCar] = useState<number | null>(null);

  const cars = [
    {
      id: 1,
      name: 'BMW 3 Series',
      description: 'Luxury sedan with advanced features.',
      basePrice: 41250,
      discount: 1750,
      estimatedTax: 3300,
      documentationFee: 500,
      imageUrl: '/images/bmw.jpg',
    },
    {
      id: 2,
      name: 'Tesla Model S',
      description: 'Electric luxury sedan with autopilot.',
      basePrice: 80000,
      discount: 2000,
      estimatedTax: 6400,
      documentationFee: 1000,
      imageUrl: '/images/tesla.jpg',
    },
    {
      id: 3,
      name: 'Ford Mustang',
      description: 'Reliable and efficient sedan.',
      basePrice: 30000,
      discount: 1000,
      estimatedTax: 2400,
      documentationFee: 300,
      imageUrl: '/images/ford.jpg',
    },
  ];

  // Function to calculate the total price
  const calculateTotal = (car: {
    basePrice: number;
    discount: number;
    estimatedTax: number;
    documentationFee: number;
  }) => {
    return car.basePrice - car.discount + car.estimatedTax + car.documentationFee;
  };

  // Function to handle "View Details" click
  const handleViewDetails = (carId: number) => {
    setSelectedCar(carId);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedCar(null);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget){
      closeModal();
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Back to Home Button */}
      <div className="mb-8">
        <Link
          href="/"
          className="flex items-center text-teal-500 hover:text-teal-600 transition-colors"
        >
          <ArrowLeft className="mr-2" /> {/* Arrow icon */}
          <span>Back to Home</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => {
          const total = calculateTotal(car); // Calculate total for each car

          return (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              {/* Car Image */}
              <img
                src={car.imageUrl}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-teal-700 mb-4">{car.name}</h2>
                <p className="text-gray-600 mb-4">{car.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Price:</span>
                    <span className="font-semibold">${car.basePrice.toLocaleString()}</span>
                  </div>
                
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600 font-bold">Total:</span>
                    <span className="text-teal-700 font-bold">${total.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleViewDetails(car.id)}
                  className="mt-6 w-full px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Car Details */}
      {selectedCar !== null && (
        <div 
        onClick={handleOutsideClick}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">
              {cars.find((car) => car.id === selectedCar)?.name}
            </h2>
            <p className="text-gray-600 mb-4">
              {cars.find((car) => car.id === selectedCar)?.description}
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price:</span>
                <span className="font-semibold">
                  ${cars.find((car) => car.id === selectedCar)?.basePrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <span className="text-red-500 font-semibold">
                  -${cars.find((car) => car.id === selectedCar)?.discount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Tax:</span>
                <span className="font-semibold">
                  ${cars.find((car) => car.id === selectedCar)?.estimatedTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Documentation Fee:</span>
                <span className="font-semibold">
                  ${cars.find((car) => car.id === selectedCar)?.documentationFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600 font-bold">Total:</span>
                <span className="text-teal-700 font-bold">
                  ${calculateTotal(cars.find((car) => car.id === selectedCar)!).toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}