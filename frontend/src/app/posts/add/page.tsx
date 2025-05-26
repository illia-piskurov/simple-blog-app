'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import api from '@/utils/axiosInstance'
import { BackArrow } from '@/components/back-arrow'
import { useAuth } from '@/contexts/auth-context'

export default function CreatePostPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      router.push('/login')
      return
    }
  }, [isAuthenticated, router, isLoading])

  const handleCreatePost = async () => {
    if (!title.trim() || !body.trim()) {
      toast.error('Title and body are required.')
      return
    }

    setLoading(true)

    api.post('/posts', {
      title,
      description,
      body,
    }).then((res) => {
      toast.success('Post created successfully!')
      router.push(`/posts/${res.data.id}`)
    }).catch(() => {
      toast.error('Failed to create post.')
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <div className="max-w-3xl mx-auto p-6 pt-24">
      <BackArrow />
      <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description (optional)"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Body</label>
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post..."
          rows={10}
        />
      </div>

      <Button onClick={handleCreatePost} disabled={loading}>
        {loading ? 'Submitting...' : 'Create Post'}
      </Button>
    </div>
  )
}
