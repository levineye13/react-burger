import React, { FC, ReactElement, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { History } from 'history';
import {
  ConstructorElement,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { useHistory } from 'react-router-dom';

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
import { INGREDIENT_TYPE, PAGES } from '../../utils/constants';
import { IIngredient } from '../../utils/interfaces';

const { bun: bunType } = INGREDIENT_TYPE;

const BurgerConstructor: FC = (): ReactElement => {
  const history: History = useHistory();

  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector(
    (state: any) => state.burgerConstructor
  );
  const { isAuth } = useSelector((state: any) => state.user);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient: IIngredient) {
      if (ingredient.type === bunType || bun._id !== undefined) {
        dispatch(addIngredient(ingredient));
        dispatch(increment(ingredient));
      }
    },
  });

  const handleButtonClick = async (): Promise<void> => {
    if (!isAuth) {
      return history.push(PAGES.login);
    }

    const ingredientsId = ingredients.map(
      (ingredient: IIngredient) => ingredient._id
    );
    dispatch(makeOrder(ingredientsId));
  };

  const handleDelete = (item: IIngredient): void => {
    dispatch(deleteIngredient(item._id));
    dispatch(decrement(item));
  };

  const calculatePrice = (arr: IIngredient[], bun: IIngredient): number => {
    return sumByKey(arr, 'price') + (bun.price || 0) * 2;
  };

  const sum = useMemo<number>(() => {
    return calculatePrice(ingredients, bun);
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
              {ingredients.map((item: IIngredient, index: number) => (
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
};

export default BurgerConstructor;
