'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

type Post = { id: number; title: string; body: string; userId: number };
type Comment = { id: number; name: string; email: string; body: string };

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Number(params?.id); // Get post ID from URL
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(userJson);

    // Fetch the post
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => res.json())
      .then(data => {
        // Check if user is allowed to view this post
        if (!user.isAdmin && data.userId !== user.id) {
          router.push('/posts'); // not allowed
        } else {
          setPost(data);
        }
      });

    // Fetch comments
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(res => res.json())
      .then(setComments)
      .finally(() => setLoading(false));
  }, [postId, router]);

  if (loading) return <p className="p-6">Loading post...</p>;
  if (!post) return <p className="p-6 text-red-500">Post not found or not accessible.</p>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white/30 backdrop-blur-md rounded-2xl shadow-xl">
      <Link
        href="/posts"
        className="ml-auto m-10 block w-fit text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 bg-blue-100 hover:bg-blue-200 rounded-full px-4 py-2 transition duration-300"
      >
        ← Back to Posts
      </Link>

      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
        <p className="text-lg text-gray-700">{post.body}</p>
      </div>
  
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Comments</h2>
        <ul className="space-y-6">
          {comments.map(comment => (
            <li key={comment.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <div className="space-y-2">
                <p className="font-semibold text-lg text-gray-800">{comment.name}</p>
                <p className="text-sm text-gray-500">{comment.email}</p>
                <p className="text-gray-700">{comment.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
}
