'use client';
import styles from "./page.module.css"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Home() {
    const [news, setNews] = useState([]);
  const router = useRouter();
    useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news/latest');
        const data = await res.json();
        setNews(data.news || []);
      } catch (error) {
        console.error('Помилка при отриманні новин:', error);
      }
    };
    fetchNews();
  }, []);
  return (
    <div className={styles.div}>
      <h1>Найновіші новини</h1>
       <div className={styles.slider}>
      {news.map((item) => (
        <div key={item.id} className={styles.slide} onClick={() => router.push(`/news/${item.id}`)}>
          <img src={item.image} alt={item.title} className={styles.image} />
          <div className={styles.caption}>
            <h3>{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
    </div>
  )
}
