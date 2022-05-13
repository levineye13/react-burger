import React, { FC, ReactElement, useMemo } from 'react';

import styles from './statistic.module.css';
import { useSelector } from '../../hooks';
import { TOrderResponce } from '../../utils/types';
import { OrderStatus } from '../../utils/constants';

type TSortedOrders = {
  ready: Array<Array<TOrderResponce>>;
  notReady: Array<Array<TOrderResponce>>;
};

const Statistic: FC = (): ReactElement => {
  const {
    total,
    totalToday,
    list: allOrders,
  } = useSelector((state) => state.webSocket.feedOrders);

  const orders: TSortedOrders = useMemo(() => {
    const res: TSortedOrders = { ready: [], notReady: [] };
    let lastReadyArr: Array<TOrderResponce> = [];
    let lastNotReadyArr: Array<TOrderResponce> = [];

    for (let index = 0; index < allOrders.length; index++) {
      const current = allOrders[index];

      if (current.status === OrderStatus.Done.En) {
        if (lastReadyArr.length >= 10) {
          res.ready.push([...lastReadyArr]);
          lastReadyArr.length = 0;
        } else {
          lastReadyArr.push(current);
        }
      } else {
        if (lastNotReadyArr.length >= 10) {
          res.notReady.push([...lastNotReadyArr]);
          lastNotReadyArr.length = 0;
        } else {
          lastNotReadyArr.push(current);
        }
      }
    }

    if (lastReadyArr.length > 0) {
      res.ready.push([...lastReadyArr]);
    }

    if (lastNotReadyArr.length > 0) {
      res.notReady.push([...lastNotReadyArr]);
    }

    return res;
  }, [allOrders]);

  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        <li className={`${styles.capture} item__title mb-6`}>
          <p className="text text_type_main-medium">Готовы:</p>
        </li>
        {orders.ready.map((arr, index) => (
          <li className={`${styles.item} mr-3 mb-6`} key={index}>
            <ul className={styles.sublist}>
              {arr.map((order) => (
                <li className={`${styles.subitem} mb-2`} key={order._id}>
                  <p
                    className={`${styles.success} text text_type_digits-default`}
                  >
                    {order.number}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <ul className={styles.list}>
        <li className={`${styles.capture} item__title mb-6`}>
          <p className="text text_type_main-medium">В работе:</p>
        </li>
        {orders.notReady.map((arr, index) => (
          <li className={`${styles.item} mr-3 mb-6`} key={index}>
            <ul className={styles.sublist}>
              {arr.map((order) => (
                <li className="item" key={order._id}>
                  <p className="text text_type_digits-default">
                    {order.number}
                  </p>
                </li>
              ))}
            </ul>
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
