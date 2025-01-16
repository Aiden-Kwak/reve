import Image from "next/image";
import styles from "./page.module.css";
import MainForm from "@/components/mainForm";
import InnerNavContent from "@/components/InnerNavContent";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <MainForm/>
      </main>
      <InnerNavContent/>
      <footer className={styles.footer}>
        <p className="logo-main-style">Rêve</p>
        <p>COPYRIGHT (C) @Aiden-Kwak. All Rights reserved</p>
      </footer>
    </div>
  );
}
