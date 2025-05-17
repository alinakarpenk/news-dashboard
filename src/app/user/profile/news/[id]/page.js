'use client'
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

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
    //e.preventDefault();
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
        <div>
            <form onSubmit={handleUpd}>
             <div>
                <input type="file"  accept="image/*" onChange={(event) => setImage(event.target.files[0])}/>    
            </div>
            <div>
                <input type="text" placeholder="Title..." value={title} onChange={(event) => setTitle(event.target.value)}/>    
            </div>
            <div>
                <input type="text" placeholder="Text..." value={text} onChange={(event) => setText(event.target.value)}/>    
            </div>
              <button type="submit">Оновити</button>
            </form>
        </div>
    )
}