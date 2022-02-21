import React, { Component } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import style from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import data from '../../utils/data';

class BurgerIngredients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: { bun: [], sauce: [], main: [] },
    };
  }

  componentDidMount() {
    const ingredients = { bun: [], sauce: [], main: [] };

    data.forEach((item) => {
      ingredients[item.type].push(item);
    });

    this.setState({ ingredients });
  }

  render() {
    const { bun, sauce, main } = this.state.ingredients;

    return (
      <section className={style.section}>
        <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
        <nav className="mt-5">
          <ul className={`${style.menu} ${style.reset}`}>
            <li>
              <Tab value={one} active={true} onClick={() => {}}>
                Булки
              </Tab>
            </li>
            <li>
              <Tab value={two} active={false} onClick={() => {}}>
                Соусы
              </Tab>
            </li>
            <li>
              <Tab value={three} active={false} onClick={() => {}}>
                Начинка
              </Tab>
            </li>
          </ul>
        </nav>
        <ul className={`${style.list} ${style.reset} mt-10`}>
          <li className="mt-10">
            <h2 className="text text_type_main-medium">Булки</h2>
            <ul className={`${style.sublist} ${style.reset}`}>
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
            <ul className={`${style.sublist} ${style.reset}`}>
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
            <ul className={`${style.sublist} ${style.reset}`}>
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
}

export default BurgerIngredients;
