import React, { FC, ReactElement } from 'react';

import styles from './order-list.module.css';
import OrderItem from '../order-item/order-item';
import { useSelector } from '../../hooks';

interface IProps {
  readonly maxWidth?: number | string;
}

const OrderList: FC<IProps> = ({ maxWidth = 'none' }): ReactElement => {
  const { allOrders } = useSelector((state) => state.webSocket);

  return (
    <section className={`${styles.section} pl-2`} style={{ maxWidth }}>
      <ul className={styles.list}>
        {allOrders.map((order) => {
          const timestamp = new Date(order.createdAt).toLocaleDateString(
            'ru-RU',
            {
              formatMatcher: 'best fit',
              weekday: 'long',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short',
            }
          );

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
