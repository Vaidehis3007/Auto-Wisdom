'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PriceTrackerWidget() {
  const [cars, setCars] = useState<any[]>([]);
  const [carModel, setCarModel] = useState('');
  const [priceInfo, setPriceInfo] = useState<any>(null);
  const [error, setError] = useState('');

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

  const handleSearch = () => {
    if (!carModel.trim()) {
      setError('Please enter a car model');
      setPriceInfo(null);
      return;
    }

    const foundCar = cars.find(
      car => car.name.toLowerCase() === carModel.toLowerCase()
    );

    if (foundCar) {
      setPriceInfo(foundCar);
      setError('');
    } else {
      setError('Car model not found');
      setPriceInfo(null);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md bg-teal-50">
       <div className="mb-8">
        <Link
          href="/"
          className="flex items-center text-teal-500 hover:text-teal-600 transition-colors"
        >
          <ArrowLeft className="mr-2" /> {/* Arrow icon */}
          <span>Back to Home</span>
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-teal-800">Price Tracker</h2>
      
      <div className="flex space-x-2 mb-4">
        <Input 
          placeholder="Enter car model (e.g., BMW 3 Series)"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          className="flex-grow border-teal-300 focus:border-teal-500"
        />
        <Button 
          onClick={handleSearch} 
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          Track Price
        </Button>
      </div>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      <AnimatePresence>
        {priceInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Card className="bg-white border-teal-200">
              <CardHeader className="bg-teal-50">
                <CardTitle className="text-teal-700">{priceInfo.name} Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-teal-700">
                  <div>
                    <strong>Base Price:</strong>
                    <p>${priceInfo.basePrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <strong>Discount:</strong>
                    <p>${priceInfo.discount.toLocaleString()}</p>
                  </div>
                  <div>
                    <strong>Estimated Tax:</strong>
                    <p>${priceInfo.estimatedTax.toLocaleString()}</p>
                  </div>
                  <div>
                    <strong>Documentation Fee:</strong>
                    <p>${priceInfo.documentationFee.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}