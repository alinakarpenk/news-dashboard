'use client'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import styles from '../../../style/news.module.css'
import Image from 'next/image';
export default function GetUserNews() {
    const [news, setNews] = useState(null)
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
        router.push(`/user/profile/news/${id}`)
    }
 return(
    <div>
     {news === null ? (
        <p>Loading...</p>
     ) : news.length > 0 ? (
                <ul className={styles.list}>
                {news.map((news) => (
                    <li key={news.id} className={styles.blocks}>
                        <Image src={news.image} className={styles.image} width={300} height={200} alt="News"/>
                        <h4>{news.title}</h4>
                        <div className={styles.buttonGroup}> 
                       <button onClick={() => handleGetNews(news.id)} className={styles.buttoncheck}>Переглянути новину</button>
                       <button onClick={() => handleDelete(news.id)} className={styles.buttondelete}>Видалити</button>
                       <button onClick={() => handlePatch(news.id)} className={styles.buttonedit}>Редагувати</button>
                       </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p>Немає даних для відображення</p>
        )}
    </div>
 )
}