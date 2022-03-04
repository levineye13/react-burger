import React, {
  useEffect,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import { IngredientsContext } from '../../services/IngredientsContext';
import Price from '../price/price';
import { sumByKey } from '../../utils/utils';

function BurgerConstructor({ onButtonClick, setOrderNumber }) {
  const { ingredients, currentBun } = useContext(IngredientsContext);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  //! Временно (useEffect), пока функционала выбора ингредиентов нет
  useEffect(() => {
    setSelectedIngredients([
      ...ingredients.sauce.slice(0, 2),
      ...ingredients.main.slice(0, 3),
    ]);
  }, [JSON.stringify(ingredients)]);

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

  const calculatePrice = useCallback(
    (arr, property, bun) => {
      return sumByKey(arr, property) + (bun[property] || 0) * 2;
    },
    [currentBun, JSON.stringify(selectedIngredients)]
  );

  const sum = useMemo(() => {
    return calculatePrice(selectedIngredients, 'price', currentBun);
  }, [currentBun, JSON.stringify(selectedIngredients)]);

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
        <Price
          type="large"
          price={sum}
          iconType="large"
          externalGeometry="mr-10"
        />
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
