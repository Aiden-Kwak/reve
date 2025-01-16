import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p className={styles.font1}>폰트 테스트. 동해물과 백두산이 마르고 닳도록.</p>
        <p className={styles.font2}>Rêve 폰트 테스트(font test). 동해물과 백두산이 마르고 닳도록.</p>
      </main>
      <footer className={styles.footer}>
        <p className="logo-main-style">Rêve</p>
        <p>COPYRIGHT (C) @Aiden-Kwak. All Rights reserved</p>
      </footer>
    </div>
  );
}
