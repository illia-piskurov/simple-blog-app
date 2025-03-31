// src/app/login/page.tsx

"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";  // Импортируем компонент кнопки
import { Input } from "@/components/ui/input";    // Импортируем компонент поля ввода
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Импортируем компоненты из shadcn/ui

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in:", { username, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {/* Используем Card для отображения содержимого формы */}
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
