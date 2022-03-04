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
import { CurrentBunContext } from '../../services/CurrentBunContext';
import Price from '../price/price';
import { sumByKey } from '../../utils/utils';
import { API_BASE_URL, API_ENDPOINT, HTTP_METHOD } from '../../utils/constants';

function BurgerConstructor({ setOrderNumber }) {
  const ingredients = useContext(IngredientsContext);
  const currentBun = useContext(CurrentBunContext);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  //! Временно (useEffect), пока функционала выбора ингредиентов нет
  useEffect(() => {
    if (ingredients) {
      setSelectedIngredients([
        ...ingredients.sauce.slice(0, 2),
        ...ingredients.main.slice(0, 4),
      ]);
    }
  }, [JSON.stringify(ingredients)]);

  async function handleButtonClick() {
    const ids = selectedIngredients.map((ingredient) => ingredient._id);

    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINT.orders}`, {
        method: HTTP_METHOD.post,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: ids,
        }),
      });

      if (!res.ok) {
        setOrderNumber(null);
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      const dataOrder = await res.json();

      if (dataOrder.success) {
        setOrderNumber(dataOrder.order.number);
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
  setOrderNumber: PropTypes.func.isRequired,
};

export default BurgerConstructor;
