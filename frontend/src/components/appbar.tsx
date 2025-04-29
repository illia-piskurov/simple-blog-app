"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function AppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userName");

    setIsLoggedIn(!!token);
    setUserName(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
  };

  return (
    <header className="w-full bg-opacity-30 backdrop-blur-lg border-b shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-filter">
      <Link href="/">
        <span className="text-3xl font-bold text-black cursor-pointer">Blog Station</span>
      </Link>

      <nav className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <Link href="/login">
              <Button>
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button>
                Register
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/profile">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt={userName || "User"} />
                <AvatarFallback>{userName}</AvatarFallback>
              </Avatar>
            </Link>
            <Button
              variant="outline"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
