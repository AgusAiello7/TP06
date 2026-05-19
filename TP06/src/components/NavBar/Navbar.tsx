import styles from './Navbar.module.css'

interface NavbarProps {
  activeView: 'feed' | 'profile'
  onNavigate: (view: 'feed' | 'profile') => void
}

const Navbar = ({ activeView: _activeView, onNavigate }: NavbarProps) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>

        <button className={styles.logo} onClick={() => onNavigate('feed')} aria-label="Inicio">
          <span className={styles.logoText}>Catsgram</span>
        </button>

        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Buscar michis..."
            className={styles.searchInput}
            aria-label="Buscar"
          />
        </div>

        <nav className={styles.navIcons}>
          <button className={styles.iconBtn} aria-label="Configuración">⚙️</button>
          <button className={styles.iconBtn} aria-label="Cámara">📷</button>
          <button className={styles.iconBtn} aria-label="Mensajes">✈️</button>
          <button
            className={styles.newPostBtn}
            onClick={() => onNavigate('profile')}
            aria-label="Nueva publicación"
          >
            ⊕ New Post
          </button>
        </nav>

      </div>
    </header>
  )
}

export default Navbar
