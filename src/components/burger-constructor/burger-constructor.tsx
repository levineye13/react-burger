import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';

class BurgerConstructor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sum: 0,
    };
  }

  checkEdgeElement(index, length) {
    if (index === 0) {
      return { type: 'top', text: ' (верх)', isLocked: true };
    }

    if (index === length - 1) {
      return { type: 'bottom', text: ' (низ)', isLocked: true };
    }

    return { type: undefined, text: '', isLocked: false };
  }

  calculatePrice(arr) {
    return arr.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
  }

  componentDidMount() {
    const { ingredients = [] } = this.props;

    const sum = this.calculatePrice(ingredients);

    this.setState({ sum });
  }

  render() {
    const { ingredients } = this.props;

    return (
      <section className={`${styles.section} pt-25 ml-10`}>
        <ul className={`${styles.list} pl-4 pr-4`}>
          {ingredients.map((item, index) => {
            const data = this.checkEdgeElement(index, ingredients.length);

            return (
              <li key={item._id} className={styles.item}>
                {!data.isLocked && <DragIcon type="primary" />}
                <ConstructorElement
                  type={data.type}
                  thumbnail={item.image}
                  text={`${item.name} ${data.text}`}
                  price={item.price}
                  isLocked={data.isLocked}
                />
              </li>
            );
          })}
        </ul>
        <div className={`${styles.sum} mt-10`}>
          <span className="text text_type_main-large mr-10">
            <span className="mr-2">{this.state.sum}</span>
            <CurrencyIcon type="primary" />
          </span>
          <Button type="primary" size="large" htmlType="submit">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default BurgerConstructor;
