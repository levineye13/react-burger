import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ConstructorElement,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';

import styles from './burger-constructor.module.css';
import Price from '../price/price';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
import { sumByKey } from '../../utils/utils';
import {
  addIngredient,
  deleteIngredient,
  increment,
  decrement,
  makeOrder,
} from '../../services/actions';
import { INGREDIENT_TYPE } from '../../utils/constants';

const { bun: bunType } = INGREDIENT_TYPE;

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      if (ingredient.type === bunType || bun._id !== undefined) {
        dispatch(addIngredient(ingredient));
        dispatch(increment(ingredient));
      }
    },
  });

  async function handleButtonClick() {
    const ingredientsId = ingredients.map((ingredient) => ingredient._id);
    dispatch(makeOrder(ingredientsId));
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
        {bun.image ? (
          <>
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
              {ingredients.map((item, index) => (
                <ConstructorIngredient
                  key={item.uuid}
                  handleDelete={handleDelete}
                  className={`${styles.subitem} mr-2`}
                  index={index}
                  {...item}
                />
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
          </>
        ) : (
          <p className={`${styles.prompt} text text_type_main-medium`}>
            Добавьте булочку
          </p>
        )}
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
          disabled={!bun.image}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
