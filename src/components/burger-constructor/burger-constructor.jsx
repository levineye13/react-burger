import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ConstructorElement,
  DragIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import styles from './burger-constructor.module.css';
import Price from '../price/price';
import { sumByKey } from '../../utils/utils';
import {
  API_BASE_URL,
  API_ENDPOINT,
  HTTP_METHOD,
  HEADERS,
} from '../../utils/constants';
import {
  openOrder,
  closeOrder,
  addIngredient,
  deleteIngredient,
  increment,
  decrement,
} from '../../services/actions';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
      dispatch(increment(ingredient));
    },
  });

  async function handleButtonClick() {
    const ids = ingredients.map((ingredient) => ingredient._id);

    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINT.orders}`, {
        method: HTTP_METHOD.post,
        headers: HEADERS,
        body: JSON.stringify({
          ingredients: ids,
        }),
      });

      if (!res.ok) {
        dispatch(closeOrder());
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      const dataOrder = await res.json();

      if (dataOrder.success) {
        dispatch(
          openOrder({
            name: dataOrder.name,
            number: dataOrder.order.number,
          })
        );
      } else {
        dispatch(closeOrder());
      }
    } catch (e) {
      console.error(e);
    }
  }

  function handleDelete(item) {
    dispatch(deleteIngredient(item._id));
    dispatch(decrement(item));
  }

  function calculatePrice(arr, property, bun) {
    return sumByKey(arr, property) + (bun[property] || 0) * 2;
  }

  const sum = useMemo(() => {
    return calculatePrice(ingredients, 'price', bun);
  }, [bun, ingredients]);

  return (
    <section className={`${styles.section} pt-25 ml-10 pl-4`}>
      <ul className={styles.list} ref={dropTarget}>
        <li className={`${styles.item} mr-4`}>
          <ConstructorElement
            type="top"
            thumbnail={bun.image || ''}
            text={`${bun.name || ''} (верх)`}
            price={bun.price || 0}
            isLocked={true}
          />
        </li>
        <ul className={styles.sublist}>
          {ingredients.map((item) => (
            <li key={uuidv4()} className={`${styles.subitem} mr-2`}>
              <DragIcon type="primary" />
              <ConstructorElement
                type={undefined}
                thumbnail={item.image}
                text={item.name}
                price={item.price}
                isLocked={false}
                handleClose={() => handleDelete(item)}
              />
            </li>
          ))}
        </ul>
        <li className={`${styles.item} mr-4`}>
          <ConstructorElement
            type="bottom"
            thumbnail={bun.image || ''}
            text={`${bun.name || ''} (низ)`}
            price={bun.price || 0}
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

export default BurgerConstructor;
