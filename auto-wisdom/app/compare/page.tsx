'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, MinusIcon, ArrowUp, ArrowDown } from 'lucide-react';

interface CarSpecs{
    id: number;
    name: string;
    basePrice: number;
    discount: number;
    estimatedTax: number;
    documentationFee: number;
    specs: {
        horsepower: number;
        mileage: number;
        torque: number;
        acceleration: number;
        topSpeed: number;
        fuelEconomy: number;
        range: number;
        weight: number;
    };
}

export default function ComparePage() {
  const [cars, setCars] = useState<CarSpecs[]>([]);
  const [car1, setCar1] = useState<string | null>(null);
  const [car2, setCar2] = useState<string | null>(null);
  const [comparedCars, setComparedCars] = useState<CarSpecs[]>([]);

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

  const renderCarDetails = (car: any, index: number) => (
    <Card key={`compared-car-${index}`} className="w-full">
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
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Performance Specs</h3>
            {renderSpecRow('Horsepower', car.specs.horsepower, comparedCars[1-index]?.specs.horsepower, 'hp')}
            {renderSpecRow('Torque', car.specs.torque, comparedCars[1-index]?.specs.torque, 'lb-ft')}
            {renderSpecRow('0-60 mph', car.specs.acceleration, comparedCars[1-index]?.specs.acceleration, 's', false)}
            {renderSpecRow('Top Speed', car.specs.topSpeed, comparedCars[1-index]?.specs.topSpeed, 'mph')}
            {renderSpecRow('Fuel Economy', car.specs.fuelEconomy, comparedCars[1-index]?.specs.fuelEconomy, 'mpg')}
            {renderSpecRow('Range', car.specs.range, comparedCars[1-index]?.specs.range, 'miles')}
            {renderSpecRow('Weight', car.specs.weight, comparedCars[1-index]?.specs.weight, 'lbs', false)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
  const getComparisonIcon = (value1: number, value2: number, higherIsBetter = true) => {
    if (value1 === value2) return <MinusIcon className="text-gray-400" size={16} />;
    const isBetter = higherIsBetter ? value1 > value2 : value1 < value2;
    return isBetter ? 
      <ArrowUp className="text-green-500" size={16} /> : 
      <ArrowDown className="text-red-500" size={16} />;
  };

  const renderSpecRow = (label: string, value1: number, value2: number, unit: string, higherIsBetter = true) => {
    const bgClass1 = value1 === Math.max(value1, value2) ? 'bg-teal-50' : '';
    const bgClass2 = value2 === Math.max(value1, value2) ? 'bg-teal-50' : '';
    return (
        <div className="grid grid-cols-2 gap-4 py-2 border-b">
          <div className={`p-2 ${bgClass1} rounded`}>
            <div className="flex items-center justify-between">
              <span>{label}:</span>
              <div className="flex items-center">
                <span className="font-semibold">{value1} {unit}</span>
                {getComparisonIcon(value1, value2, higherIsBetter)}
              </div>
            </div>
          </div>
          <div className={`p-2 ${bgClass2} rounded`}>
            <div className="flex items-center justify-between">
              <span>{label}:</span>
              <div className="flex items-center">
                <span className="font-semibold">{value2} {unit}</span>
                {getComparisonIcon(value2, value1, higherIsBetter)}
              </div>
            </div>
          </div>
        </div>
      );
    };

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