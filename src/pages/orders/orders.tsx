import React, { FC, ReactElement, useEffect } from 'react';

import styles from './orders.module.css';
import OrderList from '../../components/order-list/order-list';
import Statistic from '../../components/statistic/statistic';
import { useDispatch, useSelector } from '../../hooks';
import {
  wsFeedConnectionClosed,
  wsFeedConnectionStart,
} from '../../services/actions/web-socket';
import Loader from '../../components/loader/loader';

const Orders: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { wsConnected } = useSelector((state) => state.webSocket.feedOrders);

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
      {wsConnected ? (
        <>
          <OrderList />
          <Statistic />
        </>
      ) : (
        <Loader isCenter />
      )}
    </section>
  );
};

export default Orders;
