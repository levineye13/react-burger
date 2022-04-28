import React, { FC, ReactElement } from 'react';

import styles from './order.module.css';
import IngredientImageList from '../ingredient-image-list/ingredient-image-list';
import Price from '../price/price';
import { useSelector } from '../../hooks';

const Order: FC = (): ReactElement => {
  const orders = useSelector((state) => state.ingredients.list.slice(0, 8));

  return (
    <article className={`${styles.card} p-6`}>
      <p className={styles.info}>
        <span className={`${styles.id} text text_type_digits-default`}>
          #034535
        </span>
        <span
          className={`${styles.timestamp} text text_type_main-default text_color_inactive`}
        >
          Сегодня, 16:20 i-GMT+3
        </span>
      </p>
      <h2 className={`${styles.title} text text_type_main-medium mt-6`}>
        Death Star Starship Main бургер Готовится
      </h2>
      <div className={`${styles.main} mt-6`}>
        <IngredientImageList ingredients={orders} numberToDisplay={5} />
        <Price price={480} />
      </div>
    </article>
  );
};

export default Order;
