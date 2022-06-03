import React, { FC } from 'react';

import styles from './loader.module.css';

interface IProps {
  isCenter?: boolean;
}

const Loader: FC<IProps> = ({ isCenter }) => {
  return (
    <div className={`${styles.loader} ${isCenter ? styles.loader_center : ''}`}>
      <div className={styles.dots}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <span className="text text_type_main-medium">Загрузка...</span>
    </div>
  );
};

export default Loader;
