import { useState } from 'react'
import type { Post } from '../../types'
import styles from './PostCard.module.css'

interface PostCardProps {
  post: Post
  onSelect: (post: Post) => void
}

const PostCard = ({ post, onSelect }: PostCardProps) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes)

  const handleLike = () => {
    setLiked((prev) => !prev)
    setLikes((prev) => (liked ? prev - 1 : prev + 1))
  }

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <img
            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${post.username}`}
            alt={post.username}
            className={styles.avatar}
          />
          <span className={styles.username}>{post.username}</span>
        </div>
        <button className={styles.optionsBtn} aria-label="Opciones">···</button>
      </div>

      <div className={styles.imageContainer}>
        <img
          src={post.imageUrl}
          alt={post.caption}
          className={styles.image}
          onClick={() => onSelect(post)}
        />
      </div>

      <div className={styles.actions}>
        <div className={styles.leftActions}>
          <button onClick={handleLike} className={styles.actionBtn} aria-label="Me gusta">
            {liked ? '❤️' : '🤍'}
          </button>
          <button className={styles.actionBtn} onClick={() => onSelect(post)} aria-label="Comentarios">
            💬
          </button>
          <button className={styles.actionBtn} aria-label="Compartir">
            📤
          </button>
        </div>
        <button className={styles.actionBtn} aria-label="Guardar">🔖</button>
      </div>

      <div className={styles.info}>
        <span className={styles.likes}>{likes.toLocaleString('es-AR')} Likes</span>
        <p className={styles.caption}>
          <strong>{post.username}</strong> {post.caption}
        </p>
        <button className={styles.viewComments} onClick={() => onSelect(post)}>
          Ver  {post.comments.length} comentarios
        </button>
        <span className={styles.date}>{post.date}</span>
      </div>
    </article>
  )
}

export default PostCard
