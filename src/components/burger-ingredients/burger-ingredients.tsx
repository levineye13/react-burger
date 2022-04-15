import React, {
  FC,
  ReactElement,
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { History } from 'history';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { TABS, API_ENDPOINT } from '../../utils/constants';
import { setIngredient } from '../../services/actions';
import { IIngredient } from '../../utils/interfaces';

const { ingredients } = API_ENDPOINT;
const { one, two, three } = TABS;

const BurgerIngredients: FC = (): ReactElement => {
  const [currentTab, setCurrentTab] = useState<string>(TABS.one);
  const dispatch = useDispatch();
  const history: History = useHistory();

  const listRef = useRef<HTMLUListElement>(null);
  const bunRef = useRef<HTMLLIElement>(null);
  const sauceRef = useRef<HTMLLIElement>(null);
  const mainRef = useRef<HTMLLIElement>(null);

  const tabRefs = useMemo(
    () => ({
      one: bunRef.current,
      two: sauceRef.current,
      three: mainRef.current,
    }),
    [bunRef.current, sauceRef.current, mainRef.current]
  );

  const { bun, sauce, main } = useSelector(
    (state: any) => state.ingredients.sortedIngredients
  );
  const { ingredientsCount } = useSelector((state: any) => state.ingredients);

  useEffect(() => {
    const list: HTMLUListElement = listRef.current!;

    const handleScroll = () => {
      if (tabRefs.one && tabRefs.two && tabRefs.three) {
        const buns = (
          tabRefs.one.firstChild as Element
        ).getBoundingClientRect();
        const sauce = (
          tabRefs.two.firstChild as Element
        ).getBoundingClientRect();
        const main = (
          tabRefs.three.firstChild as Element
        ).getBoundingClientRect();

        if (buns.top < sauce.top && buns.top > 0) {
          setCurrentTab(one);
        } else if (sauce.top < main.top && sauce.top > 0) {
          setCurrentTab(two);
        } else {
          setCurrentTab(three);
        }
      }
    };

    list.addEventListener('scroll', handleScroll);

    return () => list.removeEventListener('scroll', handleScroll);
  }, [tabRefs]);

  const handleTabClick = (tab: string): void => {
    setCurrentTab(tab);

    if (tab === one) {
      tabRefs.one?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === two) {
      tabRefs.two?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === three) {
      tabRefs.three?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleIngredientClick = (ingredient: IIngredient): void => {
    history.push({
      pathname: `${ingredients}/${ingredient._id}`,
      state: { background: history.location },
    });

    dispatch(setIngredient(ingredient));
  };

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <nav className="mt-5">
        <ul className={`${styles.menu} ${styles.reset}`}>
          <li>
            <Tab
              value={one}
              active={currentTab === one}
              onClick={handleTabClick}
            >
              Булки
            </Tab>
          </li>
          <li>
            <Tab
              value={two}
              active={currentTab === two}
              onClick={handleTabClick}
            >
              Соусы
            </Tab>
          </li>
          <li>
            <Tab
              value={three}
              active={currentTab === three}
              onClick={handleTabClick}
            >
              Начинка
            </Tab>
          </li>
        </ul>
      </nav>
      <ul className={`${styles.list} ${styles.reset}`} ref={listRef}>
        <li ref={bunRef}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <ul className={`${styles.sublist} ${styles.reset}`}>
            {bun.map((item: IIngredient) => (
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
        <li className="mt-10" ref={sauceRef}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <ul className={`${styles.sublist} ${styles.reset}`}>
            {sauce.map((item: IIngredient) => (
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
        <li className="mt-10" ref={mainRef}>
          <h2 className="text text_type_main-medium">Начинка</h2>
          <ul className={`${styles.sublist} ${styles.reset}`}>
            {main.map((item: IIngredient) => (
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
};

export default BurgerIngredients;