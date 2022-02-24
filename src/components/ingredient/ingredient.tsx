import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './ingredient.module.css';

class Ingredient extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, image, price } = this.props;

    return (
      <article className={style.card}>
        <figure className={style.figure}>
          <img src={image} alt={name} />
          <figcaption>
            <div className={`${style.price} text text_type_main-medium mt-1`}>
              <span className="mr-2">{price}</span>
              <CurrencyIcon type="primary" />
            </div>
            <p className={`${style.name} text text_type_main-default mt-1`}>
              {name}
            </p>
          </figcaption>
        </figure>
      </article>
    );
  }
}

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Ingredient;
