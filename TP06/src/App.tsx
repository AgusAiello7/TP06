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
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [activeView, setActiveView] = useState<'feed' | 'profile'>('feed')
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

  const handleToggleLike = (postId: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev)
      next.has(postId) ? next.delete(postId) : next.add(postId)
      return next
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
