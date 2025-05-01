"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from '@/utils/axiosInstance'
import { PostInfo } from "@/shared/types/post.interface";
import { PostCard } from '@/components/post-card'

export default function HomePage() {
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    api
      .get(`/posts`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handlePostClick = (id: string) => {
    router.push(`/posts/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <main className="flex-1 p-6 pt-24">
        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>

        {loading && <p>Loading posts...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post.id} onClick={() => handlePostClick(post.id)} className="cursor-pointer">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <p>No posts available.</p>
        )}
      </main>
    </div>
  );
}
