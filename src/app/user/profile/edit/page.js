'use client'
import { useState, useEffect } from "react";

export default function EditProfile() {
    const [login, setLogin] = useState("");
    const [lastpass, setPass] = useState("");
    const [futurepass, setFutPass] = useState("");
    
    useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/login`);
      const data = await res.json();
      setLogin(data.login || "");
      setPass(data.lastpass || "");
      setFutPass(data.futurepass || "")
    };
    fetchUser();
  }, []);

    const handleUpd = async (e) => {
        //e.preventDefault();
        const res = await fetch('/api/user/login', {
            method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                login,
                lastpass,
                futurepass
            })
    })
    const data = await res.json()
    if(data.ok){
        console.log('profile upd')
    }
    else{
        console.log(`${data.message}`)
    }
    }
    return (
        <div>
            <form onSubmit={handleUpd}>
              <input  type="text" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Новий логін"/>
              <input type="password" value={lastpass} onChange={(e) => setPass(e.target.value)}placeholder="Старий пароль"/>
              <input type="password" value={futurepass} onChange={(e) => setFutPass(e.target.value)}placeholder="Новий пароль"/>
              <button type="submit">Оновити</button>
            </form>
        </div>
    )
}