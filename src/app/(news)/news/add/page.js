'use client'
import { useState } from 'react';
import styles from "../../../../../public/style/edit.module.css"

export default function AddNews(){
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('text', text);
        const res = await fetch('/api/news', { 
            method: 'POST',
            body: formData  
        })
        
        const data = await res.json();
        if (!res.ok) {
          setMessage(data.error || 'Помилка');
        } else {
          setMessage("Додано новину");
          setImage('');
          setTitle('');
          setText('');
        }
      };
    return(

 <div className={styles.container}>
       <h1 className={styles.h1}>Додати новину</h1>
  <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.form}>
  <input type="file" accept="image/*" onChange={(event) => setImage(event.target.files[0])} className={styles.input} data-testid="file-input"/>
  <input type="text" placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input} />
  <textarea className={styles.textarea} placeholder="Text..." value={text} onChange={(e) => setText(e.target.value)}/>
  <button type="submit" className={styles.button}>Додати новину</button>
</form>
<p className={styles.messageArea}>{message || '\u00A0'}</p>

      </div>

    )
}