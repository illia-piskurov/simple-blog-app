"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import MiniPost from "@/components/minipost";
import { useRouter } from "next/navigation";
import axios from "axios";
//import Post from "@/shared/types/post.interface";
import { PostCard, type Post } from '@/components/PostCard'

const examplePosts: Post[] = [
  {
    id: '1',
    title: 'How to use NestJS with PostgreSQL',
    description: 'In this article, we explore how to set up a NestJS project with a PostgreSQL database from scratch.',
    author: { name: 'John Doe' },
    commentsCount: 4,
  },
  {
    id: '2',
    title: 'Deploying Next.js with Vercel',
    description: 'This guide will walk you through the process of deploying your Next.js app using Vercel\'s powerful platform.',
    author: { name: 'Jane Smith' },
    commentsCount: 2,
  },
]


export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.SERVER_URL}/posts`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Header />

      <main className="flex-1 p-6 pt-24">
        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>

        {loading && <p>Loading posts...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* {posts.map((post) => (
              <MiniPost key={post.id} id={post.id} title={post.title} description={post.description} body={post.body} />
            ))} */}
            {examplePosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p>No posts available.</p>
        )}
      </main>
    </div>
  );
}
