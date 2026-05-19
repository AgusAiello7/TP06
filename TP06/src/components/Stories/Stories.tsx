import type { Post } from '../../types'
import StoryCircle from './StoryCircle'
import styles from './Stories.module.css'

interface StoriesProps {
  posts: Post[]
}

const Stories = ({ posts }: StoriesProps) => {
  return (
    <section className={styles.stories}>
      <div className={styles.storiesTrack}>
        {posts.map((post) => (
          <StoryCircle
            key={post.id}
            username={post.username}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </section>
  )
}

export default Stories
