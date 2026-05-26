import type { User, Post } from '../../types'
import styles from './Profile.module.css'

interface ProfileProps {
  user: User
  posts: Post[]
  onSelectPost: (post: Post) => void
}

const Profile = ({ user, posts, onSelectPost }: ProfileProps) => { // Recibe el usuario con sus datos y hace una función para manejar la selección de una publicación
  return (
    <div className={styles.profile}>

      <div className={styles.header}>
        <img src={user.avatar} alt={user.fullName} className={styles.avatar} />

        <div className={styles.info}>
          <div className={styles.topRow}>
            <h2 className={styles.username}>{user.username}</h2>
            <button className={styles.editBtn}>Editar perfil</button>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{user.posts}</span>
              <span className={styles.statLabel}>publicaciones</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{user.followers}</span>
              <span className={styles.statLabel}>seguidores</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{user.following}</span>
              <span className={styles.statLabel}>seguidos</span>
            </div>
          </div>

          <div className={styles.bio}>
            <span className={styles.fullName}>{user.fullName}</span>
            <p className={styles.bioText}>{user.bio}</p>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.tabs}> 
        <button className={styles.tabActive}> PUBLICACIONES</button>
      </div>

      <div className={styles.grid}>
        {posts.map((post) => ( // mapea las publicaciones del usuario y las muestra en una cuadrícula. Cada publicación es un botón que llama a la función onSelectPost con la publicación seleccionada.
          <button
            key={post.id}
            className={styles.gridItem}
            onClick={() => onSelectPost(post)} 
            aria-label={post.caption}
          >
            <img src={post.imageUrl} alt={post.caption} className={styles.gridImage} />
          </button>
        ))}
      </div>

    </div>
  )
}

export default Profile
