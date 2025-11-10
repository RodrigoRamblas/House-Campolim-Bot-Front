import Link from 'next/link'
import styles from './Menu.module.scss'

export default function Menu() {
  return (
    <div className={styles.header}>
      <div className={styles.logoWrapper}>
        <span className={styles.logoText}>GROWTHRATE</span>
      </div>
      <nav className={styles.navigation}>
        <Link href="/home" className={styles.navLink}>Home</Link>
        <Link href="/clients" className={styles.navLink}>Clientes</Link>
        <Link href="/about" className={styles.navLink}>Sobre</Link>
        <Link href="/news" className={styles.navLink}>Novidades</Link>
        <Link href="/ai-agents" className={styles.navLink}>Agentes AI</Link>
      </nav>
    </div>
  )
}