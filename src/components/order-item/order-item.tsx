import React, { FC, ReactElement, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';

import styles from './order-item.module.css';
import IngredientImageList from '../ingredient-image-list/ingredient-image-list';
import Price from '../price/price';
import { useSelector } from '../../hooks';
import { IIngredient } from '../../utils/interfaces';
import { OrderStatus, Pages } from '../../utils/constants';
import { TFilterIngredients } from '../../utils/types';
import { getStatusOrder } from '../../utils/utils';

interface IProps {
  readonly number: number;
  readonly title: string;
  readonly status: string;
  readonly timestamp: Date | string;
  readonly ingredients: ReadonlyArray<string>;
  readonly withStatus?: boolean;
}

const OrderItem: FC<IProps> = ({
  number,
  title,
  status,
  timestamp,
  ingredients,
  withStatus = false,
}): ReactElement => {
  const history: History = useHistory();

  const { list } = useSelector((state) => state.ingredients);

  const handleClick = () => {
    history.push({
      pathname: `${Pages.Feed}/${number}`,
      state: { background: history.location },
    });
  };

  const filteredIngredients: TFilterIngredients = useMemo(
    () =>
      ingredients.reduce(
        (acc: TFilterIngredients, id: string) => {
          const ingredient: IIngredient | undefined = list.find(
            (ingredient) => ingredient._id === id
          );

          if (ingredient) {
            return {
              filtered: [...acc.filtered, ingredient],
              price: acc.price + ingredient.price,
            };
          }

          return acc;
        },
        { price: 0, filtered: [] }
      ),
    [ingredients, list]
  );

  const style: string = styles[getStatusOrder(status, 'En')];

  return (
    <article className={`${styles.card} p-6`} onClick={handleClick}>
      <p className={styles.info}>
        <span className={`${styles.id} text text_type_digits-default`}>
          {`#${number}`}
        </span>
        <span
          className={`${styles.timestamp} text text_type_main-default text_color_inactive`}
        >
          {timestamp}
        </span>
      </p>
      <h2 className={`${styles.title} text text_type_main-medium mt-6`}>
        {title}
      </h2>
      {withStatus && (
        <p
          className={`${styles.status} ${style} text text_type_main-default mt-2`}
        >
          {getStatusOrder(status, 'Ru')}
        </p>
      )}
      <div className={`${styles.main} mt-6`}>
        <IngredientImageList
          ingredients={filteredIngredients.filtered}
          numberToDisplay={5}
        />
        <Price price={filteredIngredients.price} />
      </div>
    </article>
  );
};

export default OrderItem;
