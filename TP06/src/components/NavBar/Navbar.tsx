import styles from './Navbar.module.css'

interface NavbarProps {
  activeView: 'feed' | 'profile'
  onNavigate: (view: 'feed' | 'profile') => void //  es una función que se llama cuando el usuario hace clic en un elemento de navegación para cambiar la vista.
}

const Navbar = ({ activeView: _activeView, onNavigate }: NavbarProps) => { // el componente Navbar recibe dos props: activeView que indica la vista (feed o profile) y onNavigate que es una función para cambiar la vista activa 
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>

        <button className={styles.logo} onClick={() => onNavigate('feed')} aria-label="Inicio">
          <span className={styles.logoText}>Catsgram</span>
        </button>

        <div className={styles.buscador}>
          <input
            type="text"
            placeholder="Buscar michis..."
            className={styles.buscarInput}
            aria-label="Buscar"
          />
        </div>

        <nav className={styles.navIcons}>
          <button className={styles.iconBtn} aria-label="Configuración">⚙️</button>
          <button className={styles.iconBtn} aria-label="Cámara">📷</button>
          <button className={styles.iconBtn} aria-label="Mensajes">✈️</button>
          <button
            className={styles.newPostBtn}
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
