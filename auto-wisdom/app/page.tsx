import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Auto Wisdom',
  description: 'Discover and compare cars with detailed specifications and 3D viewing capabilities',
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="bg-gradient-to-r from-teal-500 to-teal-700">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-white text-center">
            Welcome to Auto Wisdom
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-white">
          <p className="text-xl mb-6">
            Your destination for comprehensive car information and comparisons
          </p>
          <div className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-6">
            <Link 
              href="/cars" 
              className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">Browse Cars</h2>
              <p>Explore our extensive collection of vehicles</p>
            </Link>
            <Link 
              href="/compare" 
              className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">Compare Models</h2>
              <p>Side-by-side comparison of your favorite cars</p>
            </Link>
            <Link 
              href="/price-tracker" 
              className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">Price Tracker</h2>
              <p>Monitor prices and get the best deals</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}