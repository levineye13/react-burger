import React, { FC, ReactElement } from 'react';

import styles from './order.module.css';
import Price from './../price/price';
import { IIngredient } from '../../utils/interfaces';
import { TOrderResponce } from '../../utils/types';
import { dateFormat, getStatusOrder } from '../../utils/utils';

type TProps = TOrderResponce & {
  price: number;
  filtered: IIngredient[];
  title?: string;
  titleStyles?: { [style: string]: string | number };
};

const Order: FC<TProps> = (props): ReactElement => {
  return (
    <article className={styles.order}>
      <p
        className={`${styles.id} text text_type_digits-default`}
        style={props.titleStyles}
      >
        {`#${props.number}`}
      </p>
      <h2 className={`${styles.title} text text_type_main-medium mt-10`}>
        {props.name}
      </h2>
      <p className={`${styles.status} text text_type_main-default mt-3`}>
        {getStatusOrder(props.status, 'Ru')}
      </p>
      <p className={`${styles.compound} text text_type_main-medium mt-15 mb-6`}>
        Состав:
      </p>
      <ul className={`${styles.list}`}>
        {props.filtered &&
          props.filtered.map((item, index) => (
            <li className={`${styles.item}`} key={index}>
              <div className={styles.circle}>
                <img className={styles.img} src={item.image} alt={item.name} />
              </div>
              <p
                className={`${styles.description} text text_type_main-default pl-4 pr-4`}
              >
                {item.name}
              </p>
              <Price price={item.price || ''} />
            </li>
          ))}
      </ul>
      <div className={`${styles.info} mt-10`}>
        <p
          className={`${styles.timestamp} text text_type_main-default text_color_inactive`}
        >
          {dateFormat(props.createdAt)}
        </p>
        <Price price={props.price || ''} />
      </div>
    </article>
  );
};

export default Order;
