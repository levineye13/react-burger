import React, { Component } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { TABS } from '../../utils/constants';

class BurgerIngredients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: TABS.one,
      ingredients: { bun: [], sauce: [], main: [] },
    };
  }

  componentDidMount() {
    const ingredients = { bun: [], sauce: [], main: [] };

    this.props.ingredients.forEach((item) => {
      ingredients[item.type].push(item);
    });

    this.setState({ ...this.state, ingredients });
  }

  setCurrentTab = (tabName) => {
    this.setState({ ...this.setState, currentTab: tabName });
  };

  render() {
    const { bun, sauce, main } = this.state.ingredients;
    const { currentTab } = this.state;
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
                onClick={this.setCurrentTab}
              >
                Булки
              </Tab>
            </li>
            <li>
              <Tab
                value={two}
                active={currentTab === two}
                onClick={this.setCurrentTab}
              >
                Соусы
              </Tab>
            </li>
            <li>
              <Tab
                value={three}
                active={currentTab === three}
                onClick={this.setCurrentTab}
              >
                Начинка
              </Tab>
            </li>
          </ul>
        </nav>
        <ul className={`${styles.list} ${styles.reset} mt-10`}>
          <li className="mt-10">
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
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default BurgerIngredients;
