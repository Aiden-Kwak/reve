import styles from './FooterForm.module.css'

export default function FooterForm () {
    return (
        <footer className={styles.footer}>
            <p className={`${styles.mobileLogo} logo-main-style`}>Rêve</p>
            <p className={styles.mobile}>COPYRIGHT (C) @Aiden-Kwak. All Rights reserved</p>
        </footer>
    );
}