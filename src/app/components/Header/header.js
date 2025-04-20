"use client"
import Link from 'next/link'
import styles from './header.module.css'

export default function Header() {
    return(
        <header className={styles.header}>
            <h3 className={styles.h3}>NewsDashboard</h3>
            <ul className={styles.navList}>
                <li><Link href="/" className={styles.navLink}>Головна</Link></li>
                <li><Link href="/news" className={styles.navLink}>Оголошення</Link></li>
                <form> 
                    <input type="search" className={styles.searchInput}/>
                </form>
                <li><Link href="/sign" className={styles.navLink}>Sign</Link></li>
                <li><Link href="/register" className={styles.navLink}>Register</Link></li>
            </ul>
        </header>
    )
  }