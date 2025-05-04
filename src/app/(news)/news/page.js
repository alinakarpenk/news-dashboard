'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import styles from '../../../../public/style/news.module.css'
export default function News() {
    const [news, setNews] = useState(null)
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/news');
                if (!response.ok) {
                    throw new Error(`Помилка: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setNews(data.rows || []);
                //console.log("Оголошення:", data.rows);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleGet = (id) => {
        router.push(`/news/${id}`);
    };

    return (
        <div>
        {news === null ? (
            <p>Завантаження...</p>
        ) : news.length > 0 ? (
            <ul className={styles.list}>
                {news.map((news) => (
                    <li key={news.id} className={styles.blocks}>
                        <img src={news.image} className={styles.image}></img>
                        <h4>{news.title}</h4>
                        <p>{news.date}</p>
                        {news.User && <p>Автор: {news.User.login}</p>}
                        <button onClick={() => handleGet(news.id)}>Переглянути новину</button>
                    </li>
                ))}
            </ul>
        ) : (
            <p>Немає даних для відображення</p>
        )}
    </div>
    )

}