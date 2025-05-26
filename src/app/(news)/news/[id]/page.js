'use client'
import { useEffect, useState } from "react";
import Image from 'next/image';
import { useParams} from 'next/navigation';
import styles from "../../../style/get-news.module.css"
export default function GetNewsByPK() {
    const [news, setNews] = useState(null);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);
    const [user, setUser] = useState(null);
    const params = useParams();
    const id = params.id;

   useEffect(() => {
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
    const fetchUser = async () => {
    const res = await fetch('/api/user/auth');
    if (res.ok) {
      const data = await res.json();
      if (data.authenticated) {
        setUser(data.user);
      }
    }
  }
        fetchUser();
        if (id) {
            fetchData();
        }
    }, [id]);


const handleDeleteComment = async (commentId) => {
  try {
    const res = await fetch(`/api/news/${id}/comments/${commentId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Не вдалося видалити коментар');
    }
    setNews((prevNews) => ({
      ...prevNews,
      Comments: prevNews.Comments.filter(comment => comment.id !== commentId),
    }));
  } catch (error) {
    console.error(error);
  }
};
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
      setMessage('')
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/news/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: comment }),
            });

            if (!res.ok) {
                throw new Error('Коментар додано не успішно');
            }
            const newComment = await res.json();
            setNews((prevNews) => ({
                ...prevNews,
                Comments: [...(prevNews.Comments || []), newComment],
            }));
            setComment('');
        } catch (error) {
            console.log('Помилка при додаванні новини:', error);
             setMessage('Будь ласка зайдіть в свій аккаунт перед додаванням коментаря');
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
                    <Image src={news.image} alt={news.title} width={600} height={400} className={styles.image} priority/>                    
                    <p className={styles.text}>{news.text}</p>
                    <p className={styles.p2}><strong className={styles.strong}>Адреса:</strong> {news.address}</p>
                    {news.User && <p className={styles.author}>Автор: {news.User.login} </p>}
                    </div>
                    <h2 className={styles.h}>Коментарі:</h2>
                    {news.Comments?.length > 0 ? (
                        <ul className={styles.ul}>
                            {news.Comments.map((comment) => (
                                <li key={comment.id} className={styles.li}>
                                    <p className={styles.p}><strong>{comment.User?.login}:</strong> {comment.text}</p>
                                    <small className={styles.small}>{comment.date}</small>
                                        {user && user.id === comment.user_id && (
                                            <div>
                                             <button className={styles.deleteButton} onClick={() => handleDeleteComment(comment.id)}>Видалити</button>
                                             </div>
                                             )}
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
                {message && <p className={styles.message}>{message}</p>}
                <button type="submit" disabled={isSubmitting} className={styles.button}>
                    {isSubmitting ? 'Додається...' : 'Додати коментар'}
                </button>
            </form>
        </div>
    );
}



