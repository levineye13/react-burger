import React, { FC, ReactElement } from 'react';

import styles from './statistic.module.css';

const Statistic: FC = (): ReactElement => {
  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        <li className="item item__title mb-6">
          <p className="text text_type_main-medium">Готовы:</p>
        </li>
        <li className="item mb-2">
          <p className={`${styles.success} text text_type_digits-default`}>
            034533
          </p>
        </li>
        <li className="item mb-2">
          <p className={`${styles.success} text text_type_digits-default`}>
            034533
          </p>
        </li>
        <li className="item mb-2">
          <p className={`${styles.success} text text_type_digits-default`}>
            034533
          </p>
        </li>
        <li className="item mb-2">
          <p className={`${styles.success} text text_type_digits-default`}>
            034533
          </p>
        </li>
        <li className="item">
          <p className={`${styles.success} text text_type_digits-default`}>
            034533
          </p>
        </li>
      </ul>
      <ul className={styles.list}>
        <li className="item item__title mb-6">
          <p className="text text_type_main-medium">В работе:</p>
        </li>
        <li className="item mb-2">
          <p className="text text_type_digits-default">034538</p>
        </li>
        <li className="item mb-2">
          <p className="text text_type_digits-default">034538</p>
        </li>
        <li className="item">
          <p className="text text_type_digits-default">034538</p>
        </li>
      </ul>
      <p className={`${styles.statistic} text text_type_main-medium mt-15`}>
        Выполнено за все время:
      </p>
      <span className={`${styles.digit} text text_type_digits-large`}>
        28 752
      </span>
      <p className={`${styles.statistic} text text_type_main-medium mt-15`}>
        Выполнено за сегодня:
      </p>
      <span className={`${styles.digit} text text_type_digits-large`}>138</span>
    </section>
  );
};

export default Statistic;
