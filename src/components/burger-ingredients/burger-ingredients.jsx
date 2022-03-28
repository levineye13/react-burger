import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { TABS, API_ENDPOINT } from '../../utils/constants';
import { setIngredient } from '../../services/actions';

const { ingredient: ingredientUrl } = API_ENDPOINT;

function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState(TABS.one);
  const sectionRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const { bun, sauce, main } = useSelector(
    (state) => state.ingredients.sortedIngredients
  );
  const { ingredientsCount } = useSelector((state) => state.ingredients);

  useEffect(() => {
    const listElement = sectionRef.current.children[2];

    function handleScroll() {
      const { children } = listElement;

      const buns = children[0].firstChild.getBoundingClientRect();
      const sauce = children[1].firstChild.getBoundingClientRect();
      const main = children[2].firstChild.getBoundingClientRect();

      if (buns.top < sauce.top && buns.top > 0) {
        setCurrentTab(one);
      } else if (sauce.top < main.top && sauce.top > 0) {
        setCurrentTab(two);
      } else {
        setCurrentTab(three);
      }
    }

    listElement.addEventListener('scroll', handleScroll);

    return () => listElement.removeEventListener('scroll', handleScroll);
  }, []);

  function handleIngredientClick(ingredient) {
    history.push({
      pathname: ingredientUrl(ingredient._id),
      state: { isModal: true },
    });

    dispatch(setIngredient(ingredient));
  }

  const { one, two, three } = TABS;

  return (
    <section className={styles.section} ref={sectionRef}>
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
                  onClick={handleIngredientClick}
                  count={ingredientsCount.bun[item._id]}
                  {...item}
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
                  onClick={handleIngredientClick}
                  count={ingredientsCount[item._id]}
                  {...item}
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
                  onClick={handleIngredientClick}
                  count={ingredientsCount[item._id]}
                  {...item}
                />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </section>
  );
}

export default BurgerIngredients;
