//page register
'use client'
import { useState } from 'react';
import styles from '../../style/user.module.css'
import { SignupFormSchema } from '../../../lib/definition';


export default function Register() {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (event) => {
      event.preventDefault();
      const result = SignupFormSchema.safeParse({ login, email, password, passwordRepeat });
    if (!result.success) {
      const firstError = Object.values(result.error.flatten().fieldErrors)[0]?.[0];
      setMessage(firstError || 'Помилка валідації');
      return;
    }
      const res = await fetch('/api/user/register', { method: 'POST', headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login,
          email,
          password,
          password_repeat: passwordRepeat
        })
      })
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'Помилка');
      } else {
        setMessage("Користувача успішно зареєстровано");
        setLogin('');
        setEmail('');
        setPassword('');
        setPasswordRepeat('');
      }
    };
    return (
              <div className={styles.container}>

      <div className={styles.register}>
       <h1 className={styles.h1}>Register</h1>
       <form onSubmit={handleSubmit}>

    <div className={styles.inputLogin}>
    <input type="text" placeholder="Login" value={login} onChange={(event) => setLogin(event.target.value)}/>    
    </div>

    <div className={styles.inputEmail}>
    <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>    
    </div>

    <div className={styles.inputPass}>
    <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>    
    </div>

    <div className={styles.inputPass2}>
    <input type="password" placeholder="Password repeat" value={passwordRepeat} onChange={(event) => setPasswordRepeat(event.target.value)}/>    
    </div>

          <button type="submit" className={styles.signb}>Зареєструватися</button>

</form>
         <p>{message}</p>
      </div>
      </div>
    );
  }