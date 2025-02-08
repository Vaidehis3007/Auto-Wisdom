'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-teal-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Auto Wisdom
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-white">Welcome, {user.name}</span>
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-teal-700"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-teal-700"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}