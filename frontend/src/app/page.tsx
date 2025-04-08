"use client";

import { useEffect, useState } from "react";
import AppBar from "@/components/appbar";
import MiniPost from "@/components/minipost";

interface Post {
  id: number;
  title: string;
  description: string;
  body: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to load posts:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <AppBar />

      <main className="flex-1 p-6">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <MiniPost key={post.id} id={post.id} title={post.title} description={post.description} body={post.body} />
            ))}
          </div>
        ) : (
          <p>No posts available.</p>
        )}
      </main>
    </div>
  );
}
