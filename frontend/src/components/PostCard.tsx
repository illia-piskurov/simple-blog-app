import { MessageCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { PostInfo } from '@/shared/types/post.interface'


interface PostCardProps {
  post: PostInfo
  onClick?: () => void
}

export function PostCard({ post, onClick }: PostCardProps) {
  return (
    <Card
      onClick={onClick}
      className="hover:shadow-md transition cursor-pointer"
    >
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
          {post.description}
        </p>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>By {post.user.username}</span>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{post.commentsCount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
