'use client'

import api from '@/utils/axiosInstance'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { Post } from '@/shared/types/post.interface'
import { BackArrow } from '@/components/back-arrow'

export default function PostPage() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get<Post>(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => toast.error('Failed to load post'))
      .finally(() => setLoading(false))
  }, [id])

  const handleAddComment = async () => {
    if (!comment.trim()) return

    try {
      const res = await api.post(
        `/comments`,
        {
          postId: id,
          message: comment,
        },
      );

      setPost((prev) =>
        prev
          ? {
            ...prev,
            comments: [...prev.comments, res.data],
          }
          : prev,
      )
      setComment('')
      toast.success('Comment added')
    } catch {
      toast.error('Failed to add comment')
    }
  }

  if (loading) return <div className="p-6 pt-24">Loading...</div>
  if (!post) return null

  return (
    <div className="max-w-3xl mx-auto p-6 pt-24">
      <BackArrow />
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      {post.description && <p className="text-muted-foreground mb-4">{post.description}</p>}
      <div className="prose dark:prose-invert mb-8">{post.body}</div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Leave a comment</h2>
        <Textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleAddComment}>Submit</Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        {post.comments.length === 0 && <p className="text-sm text-muted-foreground">No comments yet.</p>}
        {post.comments.map((c) => (
          <div key={c.id} className="mb-4 border p-3 rounded-xl">
            <p className="text-sm font-semibold">{c.user.username}</p>
            <p>{c.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
