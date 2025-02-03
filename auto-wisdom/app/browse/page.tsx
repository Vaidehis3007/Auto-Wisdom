export default async function BrowseCarsPage() {
    const res = await fetch("http://localhost:3000/api/cars");
    const cars = await res.json();
  
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold text-center">Browse Cars</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {cars.map((car) => (
            <a key={car.id} href={`/cars/${car.id}`} className="block p-4 bg-white rounded-lg shadow">
              <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded" />
              <h2 className="text-xl font-semibold mt-2">{car.name}</h2>
              <p className="text-gray-600">{car.price}</p>
            </a>
          ))}
        </div>
      </main>
    );
  }
  