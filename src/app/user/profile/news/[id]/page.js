'use client'
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from '../../../../style/edit.module.css'
export default function EditNews() {
    const { id } = useParams(); 
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [address, setAddress] = useState("");
    const [imageFile, setImage] = useState(null);
    const [imageURL, setImageURL] = useState("");
    useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(`/api/news/${id}`);
      const data = await res.json();
      setTitle(data.title || "");
      setText(data.text || "");
      setImageURL(data.image || "");      
      setAddress(data.address || "")
    };
    fetchNews();
  }, [id]);

const handleUpd = async (e) => {
    const formData = new FormData();
    //formData.append('image', imageURL);
    formData.append('title', title);
    formData.append('text', text);
    formData.append('address', address);
      if (imageFile) {
      formData.append('image', imageFile);
    }
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
            {imageURL && (
            <img src={imageURL} alt="Поточне зображення" style={{ width: '200px', marginBottom: '10px' }} />
          )}
                <input type="file"  accept="image/*" onChange={(event) => setImage(event.target.files[0])} className={styles.input}/>    
            </div>
            <div>
                <input type="text" placeholder="Title..." value={title} onChange={(event) => setTitle(event.target.value)} className={styles.input}/>    
            </div>
            <div>
                <textarea placeholder="Text..." value={text} onChange={(event) => setText(event.target.value)} className={styles.textarea}/>    
            </div>
            <div>
                  <input type="text" placeholder="Address..." value={address} onChange={(e) => setAddress(e.target.value)} className={styles.input} />

            </div>
              <button type="submit" className={styles.button}>Оновити</button>
            </form>
        </div>
    )
}