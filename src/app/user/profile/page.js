'use client'
import styles from "../../style/profile.module.css"
import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import Image from "next/image";
export default function Profile() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const handleLogout = async () => {
        const res = await fetch('/api/user/login', {
          method: 'DELETE',
        });
    
        if (res.redirected) {
          window.location.href = res.url; 
        } else {
          console.log('Помилка при виході з акаунту');
        }
      };
          useEffect(() => {
              const fetchData = async () => {
                  try {
                      const res = await fetch(`/api/user/login`);
                      if (!res.ok) {
                          throw new Error(`Помилка: ${res.status} ${res.statusText}`);
                      }
                      const data = await res.json();
                      setUser(data);
                  } catch (error) {
                      console.log(error);
                  }
              };
                fetchData();
          }, []);
      const handlePatchProfile = () => {
        router.push(`/user/profile/edit`);
    };
        const handleGetN = () => {
        router.push(`/user/profile/news`);
    };
            const handlePost = () => {
        router.push(`/news/add`);
    };
      return( 
        <div>
        <div className={styles.profile}>
  <div>
    <h2 className={styles.username}>@{user?.login}</h2>
  </div>

  <div className={styles.info}>
    <p><strong>Email:</strong> {user?.email} </p>
    <p><strong>Роль:</strong> Користувач</p>
  </div>

  <div className={styles.actions}>
    <button className={styles.button} onClick={handlePatchProfile}>Редагувати профіль</button>
    <button className={styles.buttonget} onClick={handleGetN}>Переглянути новини</button>
    <button className={styles.buttonadd} onClick={handlePost}>Додати новину</button>
    <button className={styles.logout} onClick={handleLogout}>Вийти</button>
  </div>
</div>
            </div>
      )
}