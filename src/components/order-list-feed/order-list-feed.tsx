import React, { FC, ReactElement } from 'react';

import styles from './order-list-feed.module.css';
import OrderItem from '../order-item/order-item';
import { useSelector } from '../../hooks';
import { dateFormat } from '../../utils/utils';

const OrderListFeed: FC = (): ReactElement => {
  const { list } = useSelector((state) => state.webSocket.feedOrders);

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

export default OrderListFeed;
