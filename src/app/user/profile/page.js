'use client'
import styles from "../../../../public/style/profile.module.css"
export default function Profile() {
    //return <div>profile</div>
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
    
      return( 
        <div>
        <div className={styles.profile}>
  <div>
    <h2 className={styles.username}>@user123</h2>
  </div>

  <div className={styles.info}>
    <p><strong>Email:</strong> user@example.com</p>
    <p><strong>Роль:</strong> Користувач</p>
  </div>

  <div className={styles.actions}>
    <button className={styles.button}>Редагувати профіль</button>
    <button className={styles.buttonget}>Переглянути новини</button>
    <button className={styles.buttonadd}>Додати новину</button>
    <button className={styles.logout} onClick={handleLogout}>Вийти</button>
  </div>
</div>
            </div>
      )
}
