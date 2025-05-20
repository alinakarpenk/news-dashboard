'use client'
import { useEffect, useState } from "react";
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import styles from "../../../../../public/style/get-news.module.css"
export default function GetNewsByPK() {
    const [news, setNews] = useState(null);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const params = useParams();
    const id = params.id;
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

   useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('authToken='))
    setIsAuthenticated(!!token)
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/news/${id}`);
                if (!res.ok) {
                    throw new Error(`Помилка: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                setNews(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!isAuthenticated) {
      router.push('/user/sign') 
      return
    } else{
        setIsSubmitting(true);
    }
        try {
            const res = await fetch(`/api/news/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: comment }),
            });

            if (!res.ok) {
                throw new Error('Failed to add comment');
            }

            const newComment = await res.json();
            setNews((prevNews) => ({
                ...prevNews,
                Comments: [...(prevNews.Comments || []), newComment],
            }));
            setComment('');
        
        } catch (error) {
            console.log('Error submitting comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    
    };

    return (
        <div>
            {news === null ? (
                <p>Loading...</p>
            ) : (
                <>
                <div className={styles.news}>
                    <h4 className={styles.h4}>{news.title}</h4>
                    <p className={styles.p}>{news.date}</p>
                    <Image src={news.image} alt={news.title} width={600} height={400} className={styles.image} priority/>                    <p className={styles.text}>{news.text}</p>
                    {news.User && <p className={styles.author}>Автор: {news.User.login} </p>}
                    </div>
                    <h2 className={styles.h}>Коментарі:</h2>
                    {news.Comments?.length > 0 ? (
                        <ul className={styles.ul}>
                            {news.Comments.map((comment) => (
                                <li key={comment.id} className={styles.li}>
                                    <p className={styles.p}><strong>{comment.User?.login}:</strong> {comment.text}</p>
                                    <small className={styles.small}>{comment.date}</small>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Коментарів ще немає.</p>
                    )}
                </>
            )}

            <h3 className={styles.h}>Залиште коментар:</h3>
            <form onSubmit={handleSubmit}>
                <textarea value={comment} onChange={handleCommentChange} placeholder="Напишіть ваш коментар" rows="4" required
                className={styles.textareas}/>
                <br />
                <button type="submit" disabled={isSubmitting} className={styles.button}>
                    {isSubmitting ? 'Додається...' : 'Додати коментар'}
                </button>
            </form>
        </div>
    );
}



