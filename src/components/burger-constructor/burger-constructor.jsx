import React, { useEffect, useContext, useState } from 'react';
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
import { INGREDIENT_TYPE } from '../../utils/constants';

const { sauce, main } = INGREDIENT_TYPE;

function BurgerConstructor({ onButtonClick, setOrderNumber }) {
  const { ingredients, currentBun, sum, sumDispatcher } =
    useContext(IngredientsContext);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    function calculatePrice(obj, property, bun) {
      return (
        sumForObjSubarrays(obj, property, [sauce, main]) +
        (bun[property] || 0) * 2
      );
    }

    const sum = calculatePrice(ingredients, 'price', currentBun);

    sumDispatcher({ type: 'setSum', payload: sum });
    //! Временно, пока функционала выбора булочки нет
    setSelectedIngredients([...ingredients.sauce, ...ingredients.main]);
  }, [currentBun, JSON.stringify(ingredients)]);

  async function handleButtonClick() {
    const ids = selectedIngredients.map((ingredient) => ingredient._id);

    try {
      const res = await onButtonClick(ids);

      if (res.success) {
        setOrderNumber(res.order.number);
      } else {
        setOrderNumber(null);
      }
    } catch (e) {
      console.error(e);
    }
  }

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
          {selectedIngredients.map((item, index) => (
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
          onClick={handleButtonClick}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  setOrderNumber: PropTypes.func.isRequired,
};

export default BurgerConstructor;
