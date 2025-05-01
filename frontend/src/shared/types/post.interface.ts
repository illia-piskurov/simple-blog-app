export interface Post {
  id: string
  title: string
  description: string
  body: string
  createdAt: string
  user: {
    id: string
    username: string
  }
  comments: PostComment[]
}

export interface PostComment {
  id: string
  title: string
  message: string
  createdAt: string
  user: {
    id: string
    username: string
  }
}

export interface PostInfo {
  id: string
  title: string
  description: string
  user: {
    username: string
  }
  commentsCount: number
}