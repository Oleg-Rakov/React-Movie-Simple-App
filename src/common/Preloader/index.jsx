import styles from './style.module.css';

const Preloader = () => {
  return (
    <div className={styles.preloaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Preloader;
