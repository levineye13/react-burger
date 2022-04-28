import React, { FC, ReactElement } from 'react';

import styles from './order-list.module.css';
import Order from '../order/order';
import { useSelector } from '../../hooks';

interface IProps {
  maxWidth?: number | string;
}

const OrderList: FC<IProps> = ({ maxWidth = 'none' }): ReactElement => {
  return (
    <section className={`${styles.section} pl-2`} style={{ maxWidth }}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Order />
        </li>
        <li className={styles.item}>
          <Order />
        </li>
        <li className={styles.item}>
          <Order />
        </li>
        <li className={styles.item}>
          <Order />
        </li>
        <li className={styles.item}>
          <Order />
        </li>
      </ul>
    </section>
  );
};

export default OrderList;
