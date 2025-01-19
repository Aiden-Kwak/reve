import styles from './FooterForm.module.css'

export default function FooterForm () {
    return (
        <footer className={styles.footer}>
            <p className={`${styles.mobileLogo} logo-main-style`}>
                <img src="logo_noback.png" alt="logo" />
            </p>
            <p className={styles.mobile}>COPYRIGHT (C) @Aiden-Kwak. All Rights reserved</p>
        </footer>
    );
}