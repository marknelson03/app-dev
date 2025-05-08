'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically load LeafletMap to avoid SSR issues
const LeafletMap = dynamic(() => import('../../../components/LeafletMap'), { ssr: false });

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};

export default function UserProfile() {
  const params = useParams();
  const userId = params.id;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white/30 backdrop-blur-md rounded-2xl shadow-xl">
      <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Leaflet Map showing the user's location */}
                <div className="w-full lg:w-[400px] h-96 mt-6 lg:mt-0 rounded-xl overflow-hidden shadow-lg">
          <LeafletMap
            lat={parseFloat(user.address.geo.lat)}
            lng={parseFloat(user.address.geo.lng)}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{user.name}</h1>
          <p className="text-lg text-gray-600 mb-6">@{user.username}</p>
  
          <div className="space-y-4 text-gray-700 mb-6">
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone}</p>
            <p>
              <span className="font-semibold">Website:</span>{' '}
              <a
                href={`https://${user.website}`}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                {user.website}
              </a>
            </p>
          </div>
  
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Address:</h2>
            <p>{user.address.street}, {user.address.suite}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
          </div>
          <Link
        href="/users"
        className="ml-auto m-10 block w-fit text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 bg-blue-100 hover:bg-blue-200 rounded-full px-4 py-2 transition duration-300"
      >
        ← Back to Users
      </Link>
        </div>
  

      </div>
    </div>
  );
  
}
