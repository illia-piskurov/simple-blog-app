'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export function BackArrow() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="flex items-center text-blue-600 hover:underline mb-4"
    >
      <ArrowLeft className="mr-2" size={20} />
      Back to all posts
    </button>
  )
}
