// export async function GET(req, { params }) {
//   const { id } = params;
export const GET = (req, { params }) => {
  console.log('Params: ', params)
  
  const mockCars = [
    { id: '1', name: 'Tesla Model S', price: '$80,000', image: '/tesla.jpg' },
    { id: '2', name: 'BMW M3', price: '$70,000', image: '/bmw.jpg' }
  ];
  
  const car = mockCars.find(c => c.id === id);
  
  if (!car) {
    return new Response(JSON.stringify({ error: "Car not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(car), { status: 200 });
}
