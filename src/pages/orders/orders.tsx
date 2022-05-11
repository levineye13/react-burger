import React, { FC, ReactElement, useEffect } from 'react';

import styles from './orders.module.css';
import OrderList from '../../components/order-list/order-list';
import Statistic from '../../components/statistic/statistic';
import {
  wsFeedConnectionStart,
  wsFeedConnectionClosed,
} from '../../services/actions';
import { useDispatch } from '../../hooks';

const Orders: FC = (): ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsFeedConnectionStart());

    return () => {
      dispatch(wsFeedConnectionClosed());
    };
  }, [dispatch]);

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
