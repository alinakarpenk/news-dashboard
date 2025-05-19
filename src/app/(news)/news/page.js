import Link from 'next/link';
import styles from '../../../../public/style/news.module.css';
import Image from 'next/image';

export default async function News() {
  const res = await fetch(`${process.env.BASE_URL}/api/news`, {
    cache: 'no-cache',
  });
  const data = await res.json();
  const news = data.rows || [];
  return (
    <div>
      {news.length > 0 ? (
        <ul className={styles.list}>
          {news.map((item) => (
            <li key={item.id} className={styles.blocks}>
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={250}
                className={styles.image}
                priority
              />
              <h4>{item.title}</h4>
              {item.User && <p>Автор: {item.User.login}</p>}
              <Link href={`/news/${item.id}`}>
                <button>Переглянути новину</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Немає даних для відображення</p>
      )}
    </div>
  );
}



