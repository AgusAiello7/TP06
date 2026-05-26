import type { Post } from '../../types'
import styles from './PostCard.module.css'

interface PostCardProps {
  post: Post
  liked: boolean
  onToggleLike: (postId: string) => void
  onSelect: (post: Post) => void
}

const PostCard = ({ post, liked, onToggleLike, onSelect }: PostCardProps) => {
  const likesCount = liked ? post.likes + 1 : post.likes // si el post ya está marcado como "me gusta" se muestra el número de "me gusta" original más uno. Si no está marcado como "me gusta" se muestra el número de "me gusta" original sin cambios.

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <img
              src={`https://api.thecatapi.com/v1/images/search?size=small&${post.username}`}
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
          <button onClick={() => onToggleLike(post.id)} className={styles.actionBtn} aria-label="Me gusta">
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
        <span className={styles.likes}>{likesCount} me gusta</span> 
        <p className={styles.caption}>
          <strong>{post.username}</strong> {post.caption}
        </p>
        <button className={styles.viewComments} onClick={() => onSelect(post)}>
          Ver los {post.comments.length} comentarios
        </button>
        <span className={styles.date}>{post.date}</span>
      </div>
    </article>
  )
}

export default PostCard
