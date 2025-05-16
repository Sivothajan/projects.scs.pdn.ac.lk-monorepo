import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.headingAndImage}>
      <div className={styles.logoContainer}>
        <img
          src="/images/UOP-HeaderLogo.png"
          alt="Logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.titleContainer}>
        <h1 className={styles.homeTitle}>Student Projects</h1>
        <h3 className={styles.homeSubtitle}>
          Department of Statistics & Computer Science, University of Peradeniya,
          Sri Lanka
        </h3>
      </div>
    </div>
  );
}

export default Header;
