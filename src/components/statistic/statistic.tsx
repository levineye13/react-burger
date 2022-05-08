import React, { FC, ReactElement, useMemo } from 'react';

import styles from './statistic.module.css';
import { useSelector } from '../../hooks';
import { TOrderResponce } from '../../utils/types';
import { OrderStatus } from '../../utils/constants';

type TSortedOrders = {
  ready: ReadonlyArray<TOrderResponce>;
  notReady: ReadonlyArray<TOrderResponce>;
};

const Statistic: FC = (): ReactElement => {
  const { total, totalToday, allOrders } = useSelector(
    (state) => state.webSocket
  );

  const orders: TSortedOrders = useMemo(
    () =>
      allOrders.reduce(
        (acc: TSortedOrders, order: TOrderResponce) => {
          if (order.status === OrderStatus.Done) {
            return { ...acc, ready: [...acc.ready, order] };
          }

          return { ...acc, notReady: [...acc.notReady, order] };
        },
        { ready: [], notReady: [] }
      ),
    [allOrders]
  );

  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        <li className="item item__title mb-6">
          <p className="text text_type_main-medium">Готовы:</p>
        </li>
        {orders.ready.map((order) => (
          <li className="item mb-2" key={order._id}>
            <p className={`${styles.success} text text_type_digits-default`}>
              {order.number}
            </p>
          </li>
        ))}
      </ul>
      <ul className={styles.list}>
        <li className="item item__title mb-6">
          <p className="text text_type_main-medium">В работе:</p>
        </li>
        {orders.notReady.map((order) => (
          <li className="item" key={order._id}>
            <p className="text text_type_digits-default">{order.number}</p>
          </li>
        ))}
      </ul>
      <p className={`${styles.statistic} text text_type_main-medium mt-15`}>
        Выполнено за все время:
      </p>
      <span className={`${styles.digit} text text_type_digits-large`}>
        {total}
      </span>
      <p className={`${styles.statistic} text text_type_main-medium mt-15`}>
        Выполнено за сегодня:
      </p>
      <span className={`${styles.digit} text text_type_digits-large`}>
        {totalToday}
      </span>
    </section>
  );
};

export default Statistic;
