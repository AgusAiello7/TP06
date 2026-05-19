import { useState } from 'react'
import type { Post } from './types'
import { useCats } from './hooks/useCats'
import Navbar from './components/NavBar/Navbar'
import Feed from './components/Feed/Feed'
import './App.css'

function App() {
  const { posts, loading, error } = useCats()
  const [selectedPost, _setSelectedPost] = useState<Post | null>(null)
  const [activeView, setActiveView] = useState<'feed' | 'profile'>('feed')

  void selectedPost

  return (
    <div className="app">
      <Navbar activeView={activeView} onNavigate={setActiveView} />
      <div className="layout">
        {/* <Sidebar onNavigate={setActiveView} activeView={activeView} /> */}
        <main>
          {loading && <p className="loadingMsg">Cargando gatos...</p>}
          {error && <p className="errorMsg">{error}</p>}
          {!loading && !error && (
            <Feed posts={posts} onSelectPost={_setSelectedPost} />
          )}
        </main>
        {/* <PostDetail post={selectedPost} onClose={() => _setSelectedPost(null)} /> */}
      </div>
    </div>
  )
}

export default App
