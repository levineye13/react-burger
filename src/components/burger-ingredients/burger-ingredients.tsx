import React, {
  FC,
  ReactElement,
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { History } from 'history';
import { useHistory } from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { Tabs, Pages } from '../../utils/constants';
import { setIngredient } from '../../services/actions';
import { IIngredient } from '../../utils/interfaces';
import { useDispatch, useSelector } from '../../hooks';

const BurgerIngredients: FC = (): ReactElement => {
  const [currentTab, setCurrentTab] = useState<string>(Tabs.One);
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
    (state) => state.ingredients.sortedIngredients
  );
  const { ingredientsCount } = useSelector((state) => state.ingredients);

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
          setCurrentTab(Tabs.One);
        } else if (sauce.top < main.top && sauce.top > 0) {
          setCurrentTab(Tabs.Two);
        } else {
          setCurrentTab(Tabs.Three);
        }
      }
    };

    list.addEventListener('scroll', handleScroll);

    return () => list.removeEventListener('scroll', handleScroll);
  }, [tabRefs]);

  const handleTabClick = (tab: string): void => {
    setCurrentTab(tab);

    if (tab === Tabs.One) {
      tabRefs.one?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === Tabs.Two) {
      tabRefs.two?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === Tabs.Three) {
      tabRefs.three?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleIngredientClick = (ingredient: IIngredient): void => {
    history.push({
      pathname: `${Pages.Ingredients}/${ingredient._id}`,
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
              value={Tabs.One}
              active={currentTab === Tabs.One}
              onClick={handleTabClick}
            >
              Булки
            </Tab>
          </li>
          <li>
            <Tab
              value={Tabs.Two}
              active={currentTab === Tabs.Two}
              onClick={handleTabClick}
            >
              Соусы
            </Tab>
          </li>
          <li>
            <Tab
              value={Tabs.Three}
              active={currentTab === Tabs.Three}
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
                  count={
                    typeof ingredientsCount.bun === 'object' &&
                    !Number.isNaN(Number(ingredientsCount.bun[item._id]))
                      ? Number(ingredientsCount.bun[item._id])
                      : null
                  }
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
                  count={Number(ingredientsCount[item._id]) || null}
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
                  count={Number(ingredientsCount[item._id]) || null}
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
