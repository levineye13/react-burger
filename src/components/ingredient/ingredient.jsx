import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient.module.css';
import Price from '../price/price';

function Ingredient({ onClick, count, ...props }) {
  const [, ingredientRef] = useDrag({
    type: 'ingredient',
    item: { ...props },
  });

  function handleClick() {
    onClick(props);
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
}

Ingredient.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Ingredient;
