'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface HeaderProps {
  children?: ReactNode
}

export function Header({ children }: HeaderProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsAuthenticated(!!token)
  }, [])

  const handleLogout = () => {
    axios.post('http://localhost:3000/auth/logout', {
      withCredentials: true,
    }).then(() => {
      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);
      router.push("/");
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b shadow-sm px-6 py-4 flex justify-between items-center bg-opacity-30 backdrop-blur-lg">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => router.push('/')}
      >
        Blog
      </h1>
      <div className="flex gap-4 items-center">
        {isAuthenticated ? (
          <>
            <Button variant="outline" onClick={() => router.push('/profile')}>
              Profile
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Log Out
            </Button>
          </>
        ) : (
          <Button onClick={() => router.push('/login')}>Login</Button>
        )}
        {children}
      </div>
    </header>
  )
}
