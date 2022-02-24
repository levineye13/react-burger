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

  calculatePrice(arr, bun) {
    const bunPrice = bun.price * 2 || 0;

    return arr.reduce((acc, item) => {
      return acc + item.price;
    }, bunPrice);
  }

  setSum(ingredients, bun) {
    const sum = this.calculatePrice(ingredients, bun);
    this.setState({ sum });
  }

  componentDidMount() {
    const { bun = {}, ingredients = [] } = this.props;
    this.setSum(ingredients, bun);
  }

  componentDidUpdate(prevProps, prevState) {
    const { bun, ingredients } = this.props;

    if (bun !== prevProps.bun) {
      this.setSum(ingredients, bun);
    }
  }

  render() {
    const { bun = {}, ingredients = [] } = this.props;

    return (
      <section className={`${styles.section} pt-25 ml-10 pl-4`}>
        <ul className={styles.list}>
          <li className={`${styles.item} mr-4`}>
            <ConstructorElement
              type="top"
              thumbnail={bun.image}
              text={`${bun.name} (верх)`}
              price={bun.price}
              isLocked={true}
            />
          </li>
          <ul className={styles.sublist}>
            {ingredients.map((item, index) => (
              <li key={item._id} className={`${styles.subitem} mr-2`}>
                <DragIcon type="primary" />
                <ConstructorElement
                  type={undefined}
                  thumbnail={item.image}
                  text={item.name}
                  price={item.price}
                  isLocked={false}
                />
              </li>
            ))}
          </ul>
          <li className={`${styles.item} mr-4`}>
            <ConstructorElement
              type="bottom"
              thumbnail={bun.image}
              text={`${bun.name} (низ)`}
              price={bun.price}
              isLocked={true}
            />
          </li>
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
  bun: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
  ingredients: PropTypes.array.isRequired,
};

export default BurgerConstructor;
