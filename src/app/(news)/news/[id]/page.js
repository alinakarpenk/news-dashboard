'use client'
import { useEffect, useState } from "react"
import { useParams } from 'next/navigation';

export default function GetNewsByPK(){
    const [news, setNews] = useState(null)
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
        </div>
    )
}

