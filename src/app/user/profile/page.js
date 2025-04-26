'use client'

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
    
      return <button onClick={handleLogout}>Вийти з акаунту</button>;
}
