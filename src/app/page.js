'use client';
import styles from "./page.module.css"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
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
      <h1 className={styles.h1}>Найновіші оголошення</h1>
       <div className={styles.slider}>
      {news.map((item) => (
        <div key={item.id} className={styles.slide} onClick={() => router.push(`/news/${item.id}`)}>
          <Image src={item.image} alt={item.title} className={styles.image} width={300} height={200}/>
          <div className={styles.caption}>
            <h3>{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}
