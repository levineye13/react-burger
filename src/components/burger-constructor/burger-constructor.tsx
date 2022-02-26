import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import { sumByKey } from '../../utils/utils';

function BurgerConstructor({ bun = {}, ingredients = [] }) {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const sum = calculatePrice(ingredients, bun);
    setSum(sum);
  }, [bun, JSON.stringify(ingredients)]);

  const calculatePrice = (arr, bun) =>
    sumByKey(arr, 'price') + (bun.price * 2 || 0);

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
          <span className="mr-2">{sum}</span>
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" htmlType="submit">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
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
