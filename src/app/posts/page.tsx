'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    const isAdmin = user.isAdmin === true;
    const userId = user.id;

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        if (isAdmin) {
          setPosts(data); // admin sees all posts
        } else {
          setPosts(data.filter((post: Post) => post.userId === userId));
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading posts...</p>;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Latest Posts</h1>
      <ul className="space-y-6">
        {posts.map(post => (
          <li
            key={post.id}
            className="bg-white p-6 rounded-2xl hover:shadow-xl transition-transform transform hover:scale-101"

          >
            <div className="flex items-start space-x-4">
              {/* Avatar (optional fake profile icon) */}
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {post.title.charAt(0).toUpperCase()}
              </div>
  
              <div className="flex-1 space-y-2">
                {/* Post Header */}
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
                  <span className="text-sm text-gray-400">just now</span>
                </div>
  
                {/* Post Body */}
                <p className="text-gray-700">{post.body}</p>
  
                {/* Read More / Link */}
                <Link
                  href={`/posts/${post.id}`}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Read more
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
  
  
  
}
