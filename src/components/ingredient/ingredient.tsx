import React, { FC, ReactElement } from 'react';
import { useDrag } from 'react-dnd';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient.module.css';
import Price from '../price/price';
import { IIngredient } from '../../utils/interfaces';

interface IProps extends IIngredient {
  readonly onClick: (ingredient: IIngredient) => void;
  readonly count: number;
}

const Ingredient: FC<IProps> = ({ onClick, count, ...props }): ReactElement => {
  const [, ingredientRef] = useDrag({
    type: 'ingredient',
    item: props,
  });

  const handleClick = (): void => {
    onClick(props);
  };

  return (
    <article
      className={styles.card}
      onClick={handleClick}
      ref={ingredientRef}
      draggable
    >
      <figure className={styles.figure}>
        {count && <Counter count={count} />}
        <img src={props.image} alt={props.name} />
        <figcaption>
          <Price price={props.price} />
          <p className={`${styles.name} text text_type_main-default mt-1`}>
            {props.name}
          </p>
        </figcaption>
      </figure>
    </article>
  );
};

export default Ingredient;
