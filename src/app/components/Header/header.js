"use client"
import Link from 'next/link'
import styles from './header.module.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
     const [isAuthenticated, setIsAuthenticated] = useState(false);
     const [search, setSearch] = useState('');
     const router = useRouter();

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

  const handleSearch = (event) =>{
    event.preventDefault()
    if(search.trim() !== ''){
       router.push(`/news/search?q=${encodeURIComponent(search)}`);
    }
  }

    return(
        <header className={styles.header}>
            <h3 className={styles.h3}>NewsDashboard</h3>
            <ul className={styles.navList}>
                <li><Link href="/" className={styles.navLink}>Головна</Link></li>
                <li><Link href="/news" className={styles.navLink}>Оголошення</Link></li>
                <form onSubmit={handleSearch}> 
                   <div>
                         <input type="text" className={styles.searchInput} placeholder="Пошук..." value={search} onChange={(event) => setSearch(event.target.value)}/>
                   </div>
                </form>
                {!isAuthenticated ? (
          <>
            <li><Link href="/user/sign" className={styles.navLink}>Увійти</Link></li>
          </>
        ) : (
          <li>
            <Link href="/user/profile">
              <Image
                src="/img/free-icon-user-7323280 (1).png" alt="Аватар"
                width={35} height = {35}
              />
            </Link>
          </li>
        )}
            </ul>
        </header>
    )
  }