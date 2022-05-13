import React, { FC, ReactElement, useEffect } from 'react';

import styles from './order-list.module.css';
import OrderItem from '../order-item/order-item';
import { useDispatch, useSelector } from '../../hooks';
import { dateFormat } from '../../utils/utils';
import {
  wsFeedConnectionClosed,
  wsFeedConnectionStart,
} from '../../services/actions/web-socket';

const OrderList: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.webSocket.feedOrders);

  useEffect(() => {
    dispatch(wsFeedConnectionStart());

    return () => {
      dispatch(wsFeedConnectionClosed());
    };
  }, [dispatch]);

  return (
    <section className={`${styles.section} pl-2`}>
      <ul className={styles.list}>
        {list.map((order) => {
          const timestamp = dateFormat(order.createdAt);

          return (
            <li className={styles.item} key={order._id}>
              <OrderItem
                number={order.number}
                title={order.name}
                timestamp={timestamp}
                status={order.status}
                ingredients={order.ingredients}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default OrderList;
