'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CarSpecs {
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch('/api/cars/list');
        if (!response.ok) throw new Error('Failed to fetch cars');
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      }
    }
    fetchCars();
  }, []);

  const calculateFinalPrice = (car: CarSpecs) => {
    return car.basePrice - car.discount + car.estimatedTax + car.documentationFee;
  };

  const getComparisonIcon = (value1: number, value2: number, higherIsBetter = true) => {
    if (value1 === value2) return <MinusIcon className="text-gray-400" size={16} />;
    const isBetter = higherIsBetter ? value1 > value2 : value1 < value2;
    return isBetter ? 
      <ArrowUpIcon className="text-green-500" size={16} /> : 
      <ArrowDownIcon className="text-red-500" size={16} />;
  };

  const renderSpecRow = (label: string, value1: number, value2: number, unit: string, higherIsBetter = true) => {
    const bgClass1 = value1 === Math.max(value1, value2) && value1 !== value2 ? 'bg-teal-50' : '';
    const bgClass2 = value2 === Math.max(value1, value2) && value1 !== value2 ? 'bg-teal-50' : '';

    return (
      <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100">
        <div className={`p-3 ${bgClass1} rounded-lg transition-all duration-200`}>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">{label}</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-teal-900">
                {value1} <span className="text-teal-700">{unit}</span>
              </span>
              {getComparisonIcon(value1, value2, higherIsBetter)}
            </div>
          </div>
        </div>
        <div className={`p-3 ${bgClass2} rounded-lg transition-all duration-200`}>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">{label}</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-teal-900">
                {value2} <span className="text-teal-700">{unit}</span>
              </span>
              {getComparisonIcon(value2, value1, higherIsBetter)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPriceSection = (car: CarSpecs) => (
    <>
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="space-y-3">
          <div>
            <span className="text-gray-600">Base Price</span>
            <div className="text-xl font-bold text-teal-900">
              ${car.basePrice.toLocaleString()}
            </div>
          </div>
          <div>
            <span className="text-gray-600">Estimated Tax</span>
            <div className="text-lg font-semibold text-teal-900">
              ${car.estimatedTax.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <span className="text-gray-600">Discount</span>
            <div className="text-lg font-semibold text-green-600">
              -${car.discount.toLocaleString()}
            </div>
          </div>
          <div>
            <span className="text-gray-600">Documentation Fee</span>
            <div className="text-lg font-semibold text-teal-900">
              ${car.documentationFee.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-teal-50 rounded-lg">
        <span className="text-gray-600">Final Price</span>
        <div className="text-2xl font-bold text-teal-900">
          ${calculateFinalPrice(car).toLocaleString()}
        </div>
      </div>
    </>
  );

  const renderCarDetails = (car: CarSpecs, index: number) => (
    <Card key={`compared-car-${index}`} className="w-full shadow-lg">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-200">
        <CardTitle className="text-2xl font-bold text-teal-900">{car.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {renderPriceSection(car)}
          
          <div>
            <h3 className="text-xl font-bold text-teal-900 mb-4 pb-2 border-b border-teal-200">
              Performance Specifications
            </h3>
            <div className="space-y-2">
              {renderSpecRow('Horsepower', car.specs.horsepower, comparedCars[1-index]?.specs.horsepower, 'hp')}
              {renderSpecRow('Torque', car.specs.torque, comparedCars[1-index]?.specs.torque, 'lb-ft')}
              {renderSpecRow('0-60 mph', car.specs.acceleration, comparedCars[1-index]?.specs.acceleration, 's', false)}
              {renderSpecRow('Top Speed', car.specs.topSpeed, comparedCars[1-index]?.specs.topSpeed, 'mph')}
              {renderSpecRow('Fuel Economy', car.specs.fuelEconomy, comparedCars[1-index]?.specs.fuelEconomy, 'mpg')}
              {renderSpecRow('Range', car.specs.range, comparedCars[1-index]?.specs.range, 'miles')}
              {renderSpecRow('Weight', car.specs.weight, comparedCars[1-index]?.specs.weight, 'lbs', false)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const handleCompare = async () => {
    if (!car1 || !car2 || car1 === car2) {
      alert('Please select two different cars to compare');
      return;
    }

    setIsLoading(true);
    try {
      const [car1Details, car2Details] = await Promise.all([
        fetch(`/api/cars/${car1}`).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch car ${car1}`);
          return res.json();
        }),
        fetch(`/api/cars/${car2}`).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch car ${car2}`);
          return res.json();
        })
      ]);
      setComparedCars([car1Details, car2Details]);
    } catch (error) {
      console.error('Failed to fetch car details:', error);
      alert('Failed to fetch car details. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
      <h1 className="text-4xl font-bold mb-2 text-teal-900">Car Comparison</h1>
      <p className="text-gray-600 mb-8">Compare specifications and prices between different models</p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">Select First Car</label>
          <Select onValueChange={setCar1}>
            <SelectTrigger className="border-teal-200 h-12">
              <SelectValue placeholder="Choose a car" />
            </SelectTrigger>
            <SelectContent>
              {cars.map(car => (
                <SelectItem key={`car1-${car.id}`} value={car.id.toString()}>
                  {car.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">Select Second Car</label>
          <Select onValueChange={setCar2}>
            <SelectTrigger className="border-teal-200 h-12">
              <SelectValue placeholder="Choose a car" />
            </SelectTrigger>
            <SelectContent>
              {cars.map(car => (
                <SelectItem key={`car2-${car.id}`} value={car.id.toString()}>
                  {car.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        onClick={handleCompare} 
        disabled={isLoading}
        className="mb-8 bg-teal-600 hover:bg-teal-700 h-12 px-6 text-lg"
      >
        {isLoading ? 'Comparing...' : 'Compare Cars'}
      </Button>
      
      {comparedCars.length === 2 && (
        <div className="grid md:grid-cols-2 gap-6">
          {comparedCars.map((car, index) => renderCarDetails(car, index))}
        </div>
      )}
    </div>
  );
}