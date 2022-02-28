import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './ingredient.module.css';

function Ingredient({ onClick, ...props }) {
  function handleClick() {
    onClick(props);
  }

  return (
    <article className={style.card} onClick={handleClick}>
      <figure className={style.figure}>
        <img src={props.image} alt={props.name} />
        <figcaption>
          <div className={`${style.price} text text_type_main-medium mt-1`}>
            <span className="mr-2">{props.price}</span>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`${style.name} text text_type_main-default mt-1`}>
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
