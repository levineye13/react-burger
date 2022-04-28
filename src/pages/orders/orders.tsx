import React, { FC, ReactElement } from 'react';

import styles from './orders.module.css';
import OrderList from '../../components/order-list/order-list';
import Statistic from '../../components/statistic/statistic';

const Orders: FC = (): ReactElement => {
  return (
    <section className={`${styles.section} pt-10`}>
      <h1 className={`${styles.title} text text_type_main-large mb-5 pl-2`}>
        Лента заказов
      </h1>
      <OrderList maxWidth={608} />
      <Statistic />
    </section>
  );
};

export default Orders;
