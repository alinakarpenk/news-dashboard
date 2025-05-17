'use client'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import styles from '../../../../../public/style/news.module.css'
export default function GetUserNews() {
    const [news, setNews] = useState([])
const router = useRouter();
    useEffect(() => {
        const fetchNews = async () => {
            try{
                const  res = await fetch('/api/user/news')
                if(!res.ok){
                    throw new Error(`${res.status} ${res.statusText}`)
                }

                const data = await res.json()
                setNews(data.news || [])

            } catch(error){
                console.log(error)
            }
        }
        fetchNews()
    }, [])

    const handleGetNews = (id) => {
        router.push(`/news/${id}`)
    }
     const handleDelete =  async (id) => {
         const res = await fetch(`/api/news/${id}`, {
          method: 'DELETE',
        });
    }
     const handlePatch = (id) => {
        router.push(`/news/${id}`)
    }
 return(
    <div>
        {news.length > 0  ? (
       <>
                <ul className={styles.list}>
                {news.map((news) => (
                    <li key={news.id} className={styles.blocks}>
                        <img src={news.image} className={styles.image}></img>
                        <h4>{news.title}</h4>
                        <div className={styles.buttonGroup}> 
                       <button onClick={() => handleGetNews(news.id)}>Переглянути новину</button>
                       <button onClick={() => handleDelete(news.id)}>Видалити</button>
                       <button onClick={() => handlePatch(news.id)}>Редагувати</button>
                       </div>
                    </li>
                ))}
            </ul>
            </>
        ) : (
            <p>Немає даних для відображення</p>
        )}
    </div>
 )
}