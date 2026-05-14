import styles from "./Header.module.css";

interface HeaderProps {
  onProfileClick: () => void;
  onFeedClick: () => void;
}

const Header = ({ onProfileClick, onFeedClick }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo} onClick={onFeedClick}>Instagram</h1>
        <div className={styles.search}>
          <span>🔍</span>
          <input type="text" placeholder="Buscar" />
        </div>
        <nav className={styles.nav}>
          <span onClick={onFeedClick} className={styles.icon}>🏠</span>
          <span className={styles.icon}>➕</span>
          <span className={styles.icon}>❤️</span>
          <span onClick={onProfileClick} className={styles.icon}>👤</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;