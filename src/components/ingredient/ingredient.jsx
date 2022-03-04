import React from 'react';
import PropTypes from 'prop-types';

import styles from './ingredient.module.css';
import Price from '../price/price';

function Ingredient({ onClick, ...props }) {
  function handleClick() {
    onClick(props);
  }

  return (
    <article className={styles.card} onClick={handleClick}>
      <figure className={styles.figure}>
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
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Ingredient;
