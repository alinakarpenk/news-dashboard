'use client'
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from '../../../../../../public/style/edit.module.css'
export default function EditNews() {
    const { id } = useParams(); 
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(`/api/news/${id}`);
      const data = await res.json();
      setTitle(data.title || "");
      setText(data.text || "");
      setImage(data.image || "")
    };
    fetchNews();
  }, []);

const handleUpd = async (e) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('text', text);
    try {
        const res = await fetch(`/api/news/${id}`, {
            method: 'PATCH',
            body: formData
        });
        const data = await res.json();
        if (res.ok) {
            console.log('Оголошення оновлено успішно');
        } else {
            console.error('Помилка:', data.message);
        }
    } catch (error) {
        console.error('Клієнтська помилка:', error);
    }
}
        return (

        <div className={styles.container}>
        
            <h1 className={styles.h1}>Форма оновлення новини</h1>
            
            <form onSubmit={handleUpd} className={styles.form}>
             <div>
                <input type="file"  accept="image/*" onChange={(event) => setImage(event.target.files[0])} className={styles.input}/>    
            </div>
            <div>
                <input type="text" placeholder="Title..." value={title} onChange={(event) => setTitle(event.target.value)} className={styles.input}/>    
            </div>
            <div>
                <input type="text" placeholder="Text..." value={text} onChange={(event) => setText(event.target.value)} className={styles.input}/>    
            </div>
              <button type="submit" className={styles.button}>Оновити</button>
            </form>
        </div>
    )
}