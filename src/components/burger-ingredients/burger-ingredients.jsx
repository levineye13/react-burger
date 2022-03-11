import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { TABS } from '../../utils/constants';
import { openIngredient } from '../../services/actions';

function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState(TABS.one);

  const dispatch = useDispatch();
  const { bun, sauce, main } = useSelector(
    (state) => state.ingredients.sortedIngredients
  );

  function handleIngredientClick(ingredient) {
    dispatch(openIngredient(ingredient));
  }

  const { one, two, three } = TABS;

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <nav className="mt-5">
        <ul className={`${styles.menu} ${styles.reset}`}>
          <li>
            <Tab
              value={one}
              active={currentTab === one}
              onClick={setCurrentTab}
            >
              Булки
            </Tab>
          </li>
          <li>
            <Tab
              value={two}
              active={currentTab === two}
              onClick={setCurrentTab}
            >
              Соусы
            </Tab>
          </li>
          <li>
            <Tab
              value={three}
              active={currentTab === three}
              onClick={setCurrentTab}
            >
              Начинка
            </Tab>
          </li>
        </ul>
      </nav>
      <ul className={`${styles.list} ${styles.reset}`}>
        <li>
          <h2 className="text text_type_main-medium">Булки</h2>
          <ul className={`${styles.sublist} ${styles.reset}`}>
            {bun.map((item) => (
              <li key={item._id}>
                <Ingredient onClick={handleIngredientClick} {...item} />
              </li>
            ))}
          </ul>
        </li>
        <li className="mt-10">
          <h2 className="text text_type_main-medium">Соусы</h2>
          <ul className={`${styles.sublist} ${styles.reset}`}>
            {sauce.map((item) => (
              <li key={item._id}>
                <Ingredient onClick={handleIngredientClick} {...item} />
              </li>
            ))}
          </ul>
        </li>
        <li className="mt-10">
          <h2 className="text text_type_main-medium">Начинка</h2>
          <ul className={`${styles.sublist} ${styles.reset}`}>
            {main.map((item) => (
              <li key={item._id}>
                <Ingredient onClick={handleIngredientClick} {...item} />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </section>
  );
}

export default BurgerIngredients;
