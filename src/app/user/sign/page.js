'use client'
import { useState } from 'react';

import styles from '../../../../public/style/user.module.css'


export default function Sign() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const res = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { 
                    email, 
                    password 
                }
            ),
          })

          const data = await res.json();
          if (res.ok) {
            window.location.href = '/user/profile';
          } else {
            setMessage(data.error || 'Неправильна пошта або пароль!');
            setEmail('');
            setPassword('');
          }
        }
    return (
        <div className={styles.container}>
        <div className={styles.sign}>
            <h1 className={styles.h1}>Sign-In</h1>
            <form onSubmit={handleSubmit}>
                
            <div className={styles.inputEmail}>
            <input id="email" type="text" name="email" placeholder='Email' value={email}  onChange={(e) => setEmail(e.target.value)}
        required/>
            </div>

            <div className={styles.inputPass}>
            <input id="password" type="password" name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}
        required/>
            </div>

            <button type="submit" className={styles.signb}>Увійти</button>

        <p>Ще не маєте аккаунт?</p><a href="/user/register">Зареєструватися</a>
            
            </form>
            <p className={styles.message}>{message}</p>

        </div>
        </div>
    )
}