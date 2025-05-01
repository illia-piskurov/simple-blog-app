'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import api from '@/utils/axiosInstance'
import { useAuth } from '@/contexts/auth-context'


interface HeaderProps {
  children?: ReactNode
}

export function Header({ children }: HeaderProps) {
  const router = useRouter()
  const { isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    api.post('/auth/logout').then(() => {
      localStorage.removeItem('accessToken');
      logout();
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
            <Button onClick={handleLogout}>
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
