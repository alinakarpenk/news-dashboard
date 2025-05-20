import Link from "next/link";
import styles from "../../../../../public/style/get-news.module.css"

export default async function SearchResult({searchParams}) {
      const res = await fetch(`${process.env.BASE_URL}/api/news/search?q=${searchParams.q}`);
      const data = await res.json();
      console.log('API response data:', data);
      if(data.error){
        return <p>Error: {data.error}</p>
      }
       return (
    <div>
      <h1>Результати пошуку: `{searchParams.q}`</h1>
      {data.length === 0 ? (
        <p>Оголошення не знайдено.</p>
      ) : (
        <ul>
          {data.map((news) => (
            <li key={news.id}>
              <Link href={`/news/${news.id}`} className={styles.search}>
                {news.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
