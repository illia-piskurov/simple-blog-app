'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import api from '@/utils/axiosInstance'
import { useAuth } from '@/contexts/auth-context'
import { PenTool, Sparkles } from 'lucide-react'

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
    <header className="fixed top-0 left-0 w-full z-50 border-b shadow-sm px-6 py-4 bg-opacity-30 backdrop-blur-lg flex justify-between items-center">
      {isAuthenticated ? (
        <Button
          onClick={() => router.push('/posts/add')}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold px-4 sm:px-6 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse hover:animate-none flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Share Your Story!</span>
          <span className="xs:hidden">Write</span>
          <PenTool className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      ) : (
        <div
          className="cursor-pointer bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 hover:from-blue-600 hover:via-teal-600 hover:to-green-600 text-white font-bold px-4 sm:px-6 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
          onClick={() => router.push('/')}
        >
          ✍️ Stories
        </div>
      )}

      <div className="flex gap-2 sm:gap-4 items-center">
        {isAuthenticated ? (
          <>
            <Button variant="outline" size="sm" className="sm:size-default" onClick={() => router.push('/profile')}>
              Profile
            </Button>
            <Button size="sm" className="sm:size-default" onClick={handleLogout}>
              Log Out
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            className="sm:size-default bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white font-semibold animate-bounce hover:animate-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            onClick={() => router.push('/login')}
          >
            Login ✨
          </Button>
        )}
        {children}
      </div>
    </header>
  )
}