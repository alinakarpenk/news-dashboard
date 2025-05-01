'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

 <div>
       <h1>Додати новину</h1>
       <form onSubmit={handleSubmit} encType="multipart/form-data">

    <div>
    <input type="file"  accept="image/*" onChange={(event) => setImage(event.target.files[0])}/>    
    </div>

    <div>
    <input type="text" placeholder="Title..." value={title} onChange={(event) => setTitle(event.target.value)}/>    
    </div>

    <div>
    <input type="text" placeholder="Text..." value={text} onChange={(event) => setText(event.target.value)}/>    
    </div>


          <button type="submit">Додати новину</button>

</form>
         <p>{message}</p>
      </div>

    )
}