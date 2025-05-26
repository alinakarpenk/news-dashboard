import styles from "./footer.module.css"
import Link from 'next/link'
import Image from "next/image"

export default function Footer() {
    return(
      <div>footer</div>
       /* <div className={styles.footer}>
       <div className="about">
      <h3 className={styles.h3}>Про сайт</h3>
      <p>Сайт створенний для розміщення культурних події міста Житомир</p>
    </div>
        <div className="links">
      <h3 className={styles.h3}>Корисні посилання</h3>
      <ul>
        <li className={styles.list}><Link href="/" className={styles.links_item}>Головна</Link></li>
        <li className={styles.list}><Link href="/news" className={styles.links_item}>Оголошення</Link></li>
        <li className={styles.list}><Link href="/user/sign" className={styles.links_item}>Вхід</Link></li>
      </ul>
    </div>
     <div className="contacts">
      <h3 className={styles.h3}>Контакти</h3>
      <p>Телефон: +38 (023) 456-78-90</p>
      <p>Email: news@gmail.com</p>
      <div className="socials">
       <Link href="https://www.facebook.com/?locale=uk_UA"><Image src="/img/free-icon-facebook-4494464.png" alt="Facebook" width={30} height={30} className={styles.img} priority /></Link>
       <Link href="https://www.instagram.com/"><Image src="/img/free-icon-instagram-1384015.png" alt="Instagram" width={30} height={30} priority /></Link>
      </div>
    </div>
        </div>*/
    )
  }