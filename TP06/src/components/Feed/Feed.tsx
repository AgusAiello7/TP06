import type { Post } from '../../types'
import PostCard from './PostCard'
import styles from './Feed.module.css'

interface FeedProps {
  posts: Post[]
  likedIds: Set<string>
  onToggleLike: (postId: string) => void
  onSelectPost: (post: Post) => void
}

const Feed = ({ posts, likedIds, onToggleLike, onSelectPost }: FeedProps) => {
  return (
    <section className={styles.feed}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          liked={likedIds.has(post.id)}
          onToggleLike={onToggleLike}
          onSelect={onSelectPost}
        />
      ))}
    </section>
  )
}

export default Feed
