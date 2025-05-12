/*'use client'
import { useEffect, useState } from "react"
import { useParams } from 'next/navigation';

export default function GetNewsByPK(){
    const [news, setNews] = useState(null)
    const [comment, setComment] = useState('')
    const [isSubmit, setSubmmit] = useState(false)
    const params = useParams();
    const id = params.id;
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await fetch(`/api/news/${id}`)
                if(!res.ok){
                    throw new Error(`Помилка: ${res.status} ${res.statusText}`);
                }
                const data = await res.json()
                setNews(data)
            } catch(error){
               console.log(error)

            }
        }
       if(id){
        fetchdata()
       }
    }, [id])

    const handleComment = (event) => {
      setComment(event.target.value)
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      setSubmmit(true)
    
    try {
      const res = await fetch(`/api/news/${id}/comments`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: commentText }),
      });

      if (!res.ok) {
          throw new Error('Failed to add comment');
      }

      const newComment = await res.json();
      setNews((prevNews) => ({
          ...prevNews,
          Comments: [...prevNews.Comments, newComment], 
      }));

      setComment(''); 
  } catch (error) {
      console.log('Error submitting comment:', error);
  } finally {
      setSubmmit(false);
  }
};


    return(
        <div>    
            {news === null ? (
                <p>Loading..</p>
            ): (
                <>
                   <img src={news.image}></img>
                   <h4>{news.title}</h4>
                   <p>{news.text}</p>
                   <p>{news.date}</p>
                   {news.User && <p>Автор: {news.User.login}</p>}  
                   <h2>Коментарі:</h2>
      {news.Comments?.length > 0 ? (
        <ul>
          {news.Comments.map(comment => (
            <li key={comment.id}>
              <p><strong>{comment.User?.login}:</strong> {comment.text}</p>
              <small>{comment.date}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>Коментарів ще немає.</p>
      )}
                </>
            )}    
            <h3>Залиште коментар:</h3>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={comment}
                            onChange={handleComment}
                            placeholder="Напишіть ваш коментар"
                            rows="4"
                            required
                        />
                        <br />
                        <button type="submit" disabled={isSubmit}>
                            {isSubmit ? 'Додається...' : 'Додати коментар'}
                        </button>
                    </form>
        </div>
    )
}*/

'use client'
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

export default function GetNewsByPK() {
    const [news, setNews] = useState(null);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleCommentChange = (event) => {
        setComment(event.target.value); // Виправлено "vaue" -> "value"
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
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
                    <img src={news.image} alt={news.title} />
                    <h4>{news.title}</h4>
                    <p>{news.text}</p>
                    <p>{news.date}</p>
                    {news.User && <p>Автор: {news.User.login}</p>}
                    <h2>Коментарі:</h2>
                    {news.Comments?.length > 0 ? (
                        <ul>
                            {news.Comments.map((comment) => (
                                <li key={comment.id}>
                                    <p><strong>{comment.User?.login}:</strong> {comment.text}</p>
                                    <small>{comment.date}</small>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Коментарів ще немає.</p>
                    )}
                </>
            )}

            <h3>Залиште коментар:</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Напишіть ваш коментар"
                    rows="4"
                    required
                />
                <br />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Додається...' : 'Додати коментар'}
                </button>
            </form>
        </div>
    );
}



