import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import { IngredientsContext } from '../../context/IngredientsContext';
import { sumForObjSubarrays } from '../../utils/utils';

function BurgerConstructor({ onButtonClick }) {
  const { ingredients, currentBun, sum, sumDispatcher } =
    useContext(IngredientsContext);

  useEffect(() => {
    function calculatePrice(obj, property, bun) {
      return (
        sumForObjSubarrays(obj, property, ['sauce', 'main']) +
        (bun[property] || 0) * 2
      );
    }

    const sum = calculatePrice(ingredients, 'price', currentBun);

    sumDispatcher({ type: 'setSum', payload: sum });
  }, [currentBun, JSON.stringify(ingredients)]);

  return (
    <section className={`${styles.section} pt-25 ml-10 pl-4`}>
      <ul className={styles.list}>
        <li className={`${styles.item} mr-4`}>
          <ConstructorElement
            type="top"
            thumbnail={currentBun.image || ''}
            text={`${currentBun.name || ''} (верх)`}
            price={currentBun.price || 0}
            isLocked={true}
          />
        </li>
        <ul className={styles.sublist}>
          {ingredients &&
            [...ingredients.sauce, ...ingredients.main].map((item, index) => (
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
            thumbnail={currentBun.image || ''}
            text={`${currentBun.name || ''} (низ)`}
            price={currentBun.price || 0}
            isLocked={true}
          />
        </li>
      </ul>
      <div className={`${styles.sum} mt-10`}>
        <span className="text text_type_main-large mr-10">
          <span className="mr-2">{sum}</span>
          <CurrencyIcon type="primary" />
        </span>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          onClick={onButtonClick}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  // bun: PropTypes.shape({
  //   image: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   price: PropTypes.number.isRequired,
  // }),
  // ingredients: PropTypes.array.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default BurgerConstructor;
