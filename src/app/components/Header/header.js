"use client"
import Link from 'next/link'
import styles from './header.module.css'
import { useState, useEffect } from 'react';


export default function Header() {
     const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/user/auth');
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error('Помилка при перевірці авторизації:', error);
      }
    };

    checkAuth();
  }, []);

    return(
        <header className={styles.header}>
            <h3 className={styles.h3}>NewsDashboard</h3>
            <ul className={styles.navList}>
                <li><Link href="/" className={styles.navLink}>Головна</Link></li>
                <li><Link href="/news" className={styles.navLink}>Оголошення</Link></li>
                <form> 
                   <div>
                         <input type="text" className={styles.searchInput} placeholder="Пошук..."/>
                   </div>
                </form>
                {!isAuthenticated ? (
          <>
            <li><Link href="/user/sign" className={styles.navLink}>Увійти</Link></li>
          </>
        ) : (
          <li>
            <Link href="/user/profile">
              <img
                src="/img/free-icon-user-7323280 (1).png" alt="Аватар"
                style={{ width: '35px', height: '35px'}}
              />
            </Link>
          </li>
        )}
            </ul>
        </header>
    )
  }