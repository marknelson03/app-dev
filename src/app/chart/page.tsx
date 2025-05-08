'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DashboardPage() {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUserCount(data.length));

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPostCount(data.length));

    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res => res.json())
      .then(data => setCommentCount(data.length));
  }, []);

  const chartOptions = {
    chart: {
      id: 'stats-bar',
    },
    xaxis: {
      categories: ['Users', 'Posts', 'Comments'],
    },
  };

  const chartSeries = [
    {
      name: 'Count',
      data: [userCount, postCount, commentCount],
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white/30 backdrop-blur-md rounded-2xl shadow-xl">
      <h1 className="text-4xl font-semibold text-gray-800 mb-4 text-center">User Chart</h1>
      
      {/* Optional Description */}
      <p className="text-lg text-gray-600 mb-6 text-center">
        A visual representation of users, posts and comments.
      </p>
  
      <div className="w-full mx-auto">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="heatmap"
          height={350}
        />
      </div>
      <Link
        href="/users"
        className="ml-auto m-10 block w-fit text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 bg-blue-100 hover:bg-blue-200 rounded-full px-4 py-2 transition duration-300"
      >
        Go to Users
      </Link>
    </div>
  );
  
  
}
