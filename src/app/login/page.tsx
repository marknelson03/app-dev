'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clean input values
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    console.log('Email:', cleanEmail); // for debug
    console.log('Password:', cleanPassword); // for debug

    // Admin credentials check
    if (cleanEmail === 'admin@admin.com' && cleanPassword === 'admin123') {
      const adminUser = {
        id: 0,
        name: 'Admin',
        email: 'admin@admin.com',
        isAdmin: true,
      };
      localStorage.setItem('user', JSON.stringify(adminUser));

      // ✅ Delay navigation to ensure localStorage is set
      setTimeout(() => {
        router.push('/posts');
      }, 100);
      return;
    }

    // Fetch users from JSONPlaceholder
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    const user = users.find((u: any) => u.email.toLowerCase() === cleanEmail);

    if (user && cleanPassword === user.username) {
      localStorage.setItem('user', JSON.stringify({ ...user, isAdmin: false }));
      router.push('/myposts');
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email (used as username)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password (username from JSONPlaceholder)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
  
          <div className="flex flex-col items-center space-y-3">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Login
            </button>
            <a href="/register" className="text-blue-600 hover:underline text-sm">
              Don’t have an account? Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
  
}
