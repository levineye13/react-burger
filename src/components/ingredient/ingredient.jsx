import React from 'react';
import { useDrag } from 'react-dnd';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient.module.css';
import Price from '../price/price';
import { ingredientPropTypes } from '../../utils/types';

function Ingredient({ onClick, count, name, image, price }) {
  const [, ingredientRef] = useDrag({
    type: 'ingredient',
    item: { name, image, price },
  });

  function handleClick() {
    onClick({ name, image, price });
  }

  return (
    <article
      className={styles.card}
      onClick={handleClick}
      ref={ingredientRef}
      draggable
    >
      <figure className={styles.figure}>
        {count && <Counter count={count} />}
        <img src={image} alt={name} />
        <figcaption>
          <Price price={price} />
          <p className={`${styles.name} text text_type_main-default mt-1`}>
            {name}
          </p>
        </figcaption>
      </figure>
    </article>
  );
}

Ingredient.propTypes = ingredientPropTypes;

export default Ingredient;
