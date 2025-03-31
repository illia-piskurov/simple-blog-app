"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Типы данных для постов
interface Post {
  id: number;
  title: string;
  description: string;
  user: { username: string };
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Запрос на получение постов с бэкенда
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to load posts:", err));

    // Проверка, залогинен ли пользователь
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="m-4">
            ☰ Menu
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4">
          <h2 className="text-xl font-bold mb-4">My Blog</h2>
          <nav className="flex flex-col gap-2">
            <Link href="/">
              <Button variant="ghost" className="w-full text-left">Home</Button>
            </Link>
            {isLoggedIn ? (
              <Link href="/profile">
                <Button variant="ghost" className="w-full text-left">Profile</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="ghost" className="w-full text-left">Login</Button>
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Контент */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Card key={post.id} className="cursor-pointer hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{post.description}</p>
                  <p className="text-sm text-gray-500 mt-2">By {post.user.username}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No posts available.</p>
        )}
      </main>
    </div>
  );
}
