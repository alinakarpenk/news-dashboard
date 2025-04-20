import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.div}>
      <h1>Найновіші новини</h1>
      <div className={styles.block}>
        <div className={styles.image}>image</div>
        <div>title</div>
      </div>
      <button className={styles.button}>Переглянути інші новини</button>
    </div>
  )
}
