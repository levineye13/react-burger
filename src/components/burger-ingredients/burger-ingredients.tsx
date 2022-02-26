import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { TABS } from '../../utils/constants';

function BurgerIngredients({ ingredients }) {
  const [currentTab, setCurrentTab] = useState(TABS.one);

  const { bun = [], sauce = [], main = [] } = ingredients;
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
                <Ingredient
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              </li>
            ))}
          </ul>
        </li>
        <li className="mt-10">
          <h2 className="text text_type_main-medium">Соусы</h2>
          <ul className={`${styles.sublist} ${styles.reset}`}>
            {sauce.map((item) => (
              <li key={item._id}>
                <Ingredient
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              </li>
            ))}
          </ul>
        </li>
        <li className="mt-10">
          <h2 className="text text_type_main-medium">Начинка</h2>
          <ul className={`${styles.sublist} ${styles.reset}`}>
            {main.map((item) => (
              <li key={item._id}>
                <Ingredient
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.shape({
    bun: PropTypes.array.isRequired,
    sauce: PropTypes.array.isRequired,
    main: PropTypes.array.isRequired,
  }).isRequired,
};

export default BurgerIngredients;
