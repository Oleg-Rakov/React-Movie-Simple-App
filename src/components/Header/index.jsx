import React from 'react';
import styles from './style.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.title}>Mortal Kombat</span>
        <p className={styles.desc}>
          Washed-up MMA fighter Cole Young, unaware of his heritage, and hunted
          by Emperor Shang Tsung's best warrior, Sub-Zero, seeks out and trains
          with Earth's greatest champions as he prepares to stand against the
          enemies of Outworld in a high stakes battle for the universe.
        </p>
      </div>
    </div>
  );
};

export default Header;
