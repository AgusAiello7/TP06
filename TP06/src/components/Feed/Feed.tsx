import type { Post } from '../../types'
import PostCard from '../Feed/PostCard'
import styles from '../Feed/Feed.module.css'

interface FeedProps {
  posts: Post[]
  onSelectPost: (post: Post) => void
}

const Feed = ({ posts, onSelectPost }: FeedProps) => {
  return (
    <section className={styles.feed}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onSelect={onSelectPost} />
      ))}
    </section>
  )
}

export default Feed
