'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ComparePage() {
  const [cars, setCars] = useState<any[]>([]);
  const [car1, setCar1] = useState<string | null>(null);
  const [car2, setCar2] = useState<string | null>(null);
  const [comparedCars, setComparedCars] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch('/api/cars/list');
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      }
    }
    fetchCars();
  }, []);

  const handleCompare = async () => {
    if (!car1 || !car2 || car1 === car2) {
      alert('Please select two different cars to compare');
      return;
    }

    try {
      const [car1Details, car2Details] = await Promise.all([
        fetch(`/api/cars/${car1}`).then(res => res.json()),
        fetch(`/api/cars/${car2}`).then(res => res.json())
      ]);
      setComparedCars([car1Details, car2Details]);
    } catch (error) {
      console.error('Failed to fetch car details:', error);
    }
  };

  const renderCarDetails = (car: any) => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{car.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Base Price:</strong> ${car.basePrice.toLocaleString()}
          </div>
          <div>
            <strong>Discount:</strong> ${car.discount.toLocaleString()}
          </div>
          <div>
            <strong>Estimated Tax:</strong> ${car.estimatedTax.toLocaleString()}
          </div>
          <div>
            <strong>Documentation Fee:</strong> ${car.documentationFee.toLocaleString()}
          </div>
          <div colSpan={2}>
            <strong>Description:</strong> {car.description}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6">
        <div className="mb-8">
        <Link
          href="/"
          className="flex items-center text-teal-500 hover:text-teal-600 transition-colors"
        >
          <ArrowLeft className="mr-2" /> {/* Arrow icon */}
          <span>Back to Home</span>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-teal-500">Car Price Comparison</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2">Select First Car</label>
          <Select onValueChange={(value) => setCar1(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a car" />
            </SelectTrigger>
            <SelectContent>
              {cars.map(car => (
                <SelectItem key={car.id} value={car.id.toString()}>
                  {car.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block mb-2">Select Second Car</label>
          <Select onValueChange={(value) => setCar2(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a car" />
            </SelectTrigger>
            <SelectContent>
              {cars.map(car => (
                <SelectItem key={car.id} value={car.id.toString()}>
                  {car.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button onClick={handleCompare} className="mb-6 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors">Compare Cars</Button>
      
      {comparedCars.length === 2 && (
        <div className="grid md:grid-cols-2 gap-6">
          {comparedCars.map(renderCarDetails)}
        </div>
      )}
    </div>
  );
}