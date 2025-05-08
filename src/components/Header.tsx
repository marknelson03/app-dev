'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for managing mobile menu visibility

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState); // Toggle the state of the mobile menu
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Hide header on /login or /register
  if (pathname === '/login' || pathname === '/register' || pathname === '/') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-md z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo or Brand Name */}
        <Link href="/" className="text-2xl font-semibold text-white hover:text-blue-600">
          MyApp
        </Link>
  
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-4 lg:space-x-6">
          {pathname === '/myposts' ? (
            user && (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-medium"
                aria-label="Logout"
              >
                Logout
              </button>
            )
          ) : (
            <>
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/users" className="nav-link">Users</Link>
              <Link href="/posts" className="nav-link">Posts</Link>
              <Link href="/chart" className="nav-link">Dashboard</Link>
              <Link href="/login" className="nav-link">Login</Link>
              <Link href="/register" className="nav-link">Register</Link>
              {user && (
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 font-medium"
                  aria-label="Logout"
                >
                  Logout
                </button>
              )}
            </>
          )}
        </div>
  
        {/* Hamburger Menu Button (Mobile Only) */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
  
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-gray-800/90 text-white space-y-3 py-4 px-4">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/users" className="nav-link">Users</Link>
          <Link href="/posts" className="nav-link">Posts</Link>
          <Link href="/chart" className="nav-link">Dashboard</Link>
          <Link href="/login" className="nav-link">Login</Link>
          <Link href="/register" className="nav-link">Register</Link>
          {user && (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium"
              aria-label="Logout"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
  
  
  
}
