import type { Post } from '../../types'
import PostCard from './PostCard'
import styles from './Feed.module.css'

interface FeedProps { 
  posts: Post[]
  likedIds: Set<string> // Conjunto de IDs de publicaciones que han sido marcadas como "me gusta"
  onToggleLike: (postId: string) => void // es una función que recibe un postId de tipo string yc cambia el estado de "me gusta" de esa publicación
  onSelectPost: (post: Post) => void //es una función que recibe un objeto post de tipo Post y muestra los detalles de la publicación como los comentarios o la información adicional.
}

const Feed = ({ posts, likedIds, onToggleLike, onSelectPost }: FeedProps) => { 
  return (
    <section className={styles.feed}>
      {posts.map((post) => ( //se utiliza para iterar sobre el array de publicaciones (posts) y renderizar un componente PostCard para cada publicación.
        <PostCard
          key={post.id}
          post={post}
          liked={likedIds.has(post.id)} //  se verifica si el ID de la publicación actual está presente en el conjunto likedIds para determinar si la publicación ha sido likeada o no. 
          onToggleLike={onToggleLike} 
          onSelect={onSelectPost} 
        />
      ))}
    </section>
  )
}

export default Feed
