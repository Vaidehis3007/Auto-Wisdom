import { NextResponse } from 'next/server';

const cars = [
  {
    id: 1,
    name: 'BMW 3 Series',
    description: 'Luxury sedan with advanced features.',
    basePrice: 41250,
    discount: 1750,
    estimatedTax: 3300,
    documentationFee: 500,
    imageUrl: '/images/bmw-3-series.jpg',
    modelId:"82534fdddd7e46e4bdb202d6c1d3c0e7",
    specs: {
      horsepower: 255,
      torque: 295,
      acceleration: 5.6,
      topSpeed: 155,
      fuelEconomy: 26,
      range: 460,
      weight: 3582
    }
  },
  {
    id: 2,
    name: 'Tesla Model S',
    description: 'Electric luxury sedan with autopilot.',
    basePrice: 80000,
    discount: 2000,
    estimatedTax: 6400,
    documentationFee: 1000,
    imageUrl: '/images/tesla-model-s.jpg',
    modelId: "5c0f22e3cbc24c89879fadaa440c350f",
    specs: {
      horsepower: 670,
      torque: 720,
      acceleration: 3.1,
      topSpeed: 155,
      fuelEconomy: 120,
      range: 405,
      weight: 4561
    }
  },
  {
    id: 3,
    name: 'Ford Mustang',
    description: 'Reliable and efficient sedan.',
    basePrice: 30000,
    discount: 1000,
    estimatedTax: 2400,
    documentationFee: 300,
    imageUrl: '/images/ford-mustang.jpg',
    modelId: "5f4e3965f79540a9888b5d05acea5943",
    specs: {
      horsepower: 310,
      torque: 350,
      acceleration: 5.1,
      topSpeed: 155,
      fuelEconomy: 22,
      range: 380,
      weight: 3730
    }
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const car = cars.find((car) => car.id === parseInt(id));

  if (!car) {
    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  }

  return NextResponse.json(car);
}