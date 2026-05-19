import type { User } from '../../types'
import styles from './Sidebar.module.css'

interface SidebarProps {
  user: User
  activeView: 'feed' | 'profile'
  onNavigate: (view: 'feed' | 'profile') => void
}

const navItems = [
  { label: 'Home',         emoji: '🏠', view: 'feed'    },
  { label: 'Explore',      emoji: '🧭', view: null      },
  { label: 'Reels',        emoji: '🎬', view: null      },
  { label: 'IGTV',         emoji: '📺', view: null      },
  { label: 'Notification', emoji: '🔔', view: null      },
] as const

const Sidebar = ({ user, activeView, onNavigate }: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>

      <div className={styles.profile}>
        <button
          className={styles.avatarBtn}
          onClick={() => onNavigate('profile')}
          aria-label="Ver mi perfil"
        >
          <img
            src={user.avatar}
            alt={user.fullName}
            className={styles.avatar}
          />
        </button>
        <div className={styles.name}>
          <span className={styles.fullName}>{user.fullName}</span>
          <span className={styles.verified}>✔</span>
        </div>
        <span className={styles.username}>@{user.username}</span>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statIcon}>👤</span>
            <span className={styles.statValue}>{user.followers}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>❤️</span>
            <span className={styles.statValue}>{user.following}</span>
          </div>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`${styles.navItem} ${activeView === item.view ? styles.active : ''}`}
            onClick={() => item.view && onNavigate(item.view)}
            aria-label={item.label}
          >
            <span className={styles.navIcon}>{item.emoji}</span>
            <span className={styles.navLabel}>{item.label}</span>
          </button>
        ))}
      </nav>

    </aside>
  )
}

export default Sidebar
