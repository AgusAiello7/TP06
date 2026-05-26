import type { Post } from '../../types'
import styles from './PostDetail.module.css'

interface PostDetailProps {
  post: Post | null
  liked: boolean
  onToggleLike: (postId: string) => void
  onClose: () => void
}

const PostDetail = ({ post, liked, onToggleLike, onClose }: PostDetailProps) => {
  if (!post) return null

  const likesCount = liked ? post.likes + 1 : post.likes

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">✕</button>

        <div className={styles.imageSection}>
          <img src={post.imageUrl} alt={post.caption} className={styles.image} />
        </div>

        <div className={styles.infoSection}>

            <div className={styles.header}>
            <img
              src={`https://api.thecatapi.com/v1/images/search?size=small&${post.username}`}
              alt={post.username}
              className={styles.avatar}
            />
            <span className={styles.username}>{post.username}</span>
            </div>

          <div className={styles.comments}>
            <div className={styles.caption}>
              <strong>{post.username}</strong> {post.caption}
            </div>
            {post.comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <strong>{comment.username}</strong> {comment.text}
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <div className={styles.actionRow}>
              <button className={styles.actionBtn} onClick={() => onToggleLike(post.id)} aria-label="Me gusta">
                {liked ? '❤️' : '🤍'}
              </button>
              <button className={styles.actionBtn} aria-label="Comentar">💬</button>
              <button className={styles.actionBtn} aria-label="Compartir">📤</button>
            </div>
            <button className={styles.actionBtn} aria-label="Guardar">🔖</button>
          </div>

          <div className={styles.footer}>
            <span className={styles.likes}>{likesCount} me gusta</span>
            <span className={styles.date}>{post.date}</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PostDetail
