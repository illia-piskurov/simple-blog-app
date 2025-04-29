"use client";

import { useEffect, useState } from "react";
import AppBar from "@/components/appbar";
import MiniPost from "@/components/minipost";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  title: string;
  description: string;
  body: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  // Загрузка данных с сервера
  useEffect(() => {
    // Проверка на авторизацию
    const token = document.cookie.split("; ").find(row => row.startsWith("token="));
    if (token) {
      setIsAuthenticated(true);
    }

    fetch("http://127.0.0.1:3000/posts")
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

  const handleLogout = () => {
    // Логика выхода из системы
    document.cookie = "token=; Max-Age=0"; // Удаляем токен
    setIsAuthenticated(false);
    router.push("/"); // Перенаправляем на главную
  };

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <AppBar />

      <main className="flex-1 p-6">
        <div className="flex justify-between mb-4">
          {isAuthenticated ? (
            <div>
              <button onClick={() => router.push("/profile")}>Profile</button>
              <button onClick={handleLogout}>Log out</button>
            </div>
          ) : (
            <div>
              <button onClick={() => router.push("/login")}>Login</button>
              <button onClick={() => router.push("/register")}>Register</button>
            </div>
          )}
        </div>

        {/* Загрузка и ошибки */}
        {loading && <p>Loading posts...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Отображение постов */}
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
