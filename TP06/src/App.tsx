import { useState } from 'react'
import type { Post } from './types'
import { useCats } from './hooks/useCats'
import { currentUser } from './data/userData'
import Navbar from './components/NavBar/Navbar'
import Sidebar from './components/SideBar/Sidebar'
import Stories from './components/Stories/Stories'
import Feed from './components/Feed/Feed'
import Profile from './components/Profile/Profile'
import PostDetail from './components/PostDetail/PostDetail'
import './App.css'

function App() {
  const { posts, loading, error } = useCats()
  const [selectedPost, setSelectedPost] = useState<Post | null>(null) // se utiliza para almacenar la publicación actualmente seleccionada. al principio no hay ninguna publicación seleccionada, por lo que se establece como null. Cuando el usuario selecciona una publicación, el estado selectedPost se actualiza
  const [activeView, setActiveView] = useState<'feed' | 'profile'>('feed') // se utiliza para controlar la vista activa entre el feed y el perfil. El estado activeView se inicializa con en el feed lo que significa que la vista del feed será la que se muestre inicialmente cuando se cargue la aplicación.
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set()) // se utliz Set ya que es una colección de valores únicos, lo que facilita la gestión de los "me gusta" sin preocuparse por duplicados.

  const handleToggleLike = (postId: string) => {
    setLikedIds((prev) => {  // agrega o elimina el id de una publicación del conjunto likedIds dependiendo de si ya estaba o no. 
      if (prev.has(postId)) {
        return new Set(Array.from(prev).filter((id) => id !== postId)) // si el ID de la publicación ya estáaba en el conjunto likedIds se crea un nuevo conjunto sin ese ID utilizando filter para eliminarlo.
      }

      return new Set([...prev, postId]) // si el ID de la publicación no estaba en el conjunto likedIds se crea un nuevo conjunto que incluye todos los IDs anteriores más el nuevo ID 
    })
  }

  return (
    <div className="app">
      <Navbar activeView={activeView} onNavigate={setActiveView} /> 
      <div className="layout">
        <Sidebar user={currentUser} activeView={activeView} onNavigate={setActiveView} />
        <main className="main">
          {loading && <p className="loadingMsg">Cargando gatos...</p>}
          {error && <p className="errorMsg">{error}</p>}
          {!loading && !error && activeView === 'feed' && (
            <>
              <Stories posts={posts} />
              <Feed
                posts={posts}
                likedIds={likedIds}
                onToggleLike={handleToggleLike}
                onSelectPost={setSelectedPost}
              />
            </>
          )}
          {!loading && !error && activeView === 'profile' && (
            <Profile
              user={currentUser}
              posts={posts}
              onSelectPost={setSelectedPost}
            />
          )}
        </main>
      </div>
      <PostDetail
        post={selectedPost}
        liked={selectedPost ? likedIds.has(selectedPost.id) : false}
        onToggleLike={handleToggleLike}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  )
}

export default App
