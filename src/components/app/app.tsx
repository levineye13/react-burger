import React, { Component } from 'react';

import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import data from '../../utils/data';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: { bun: [], sauce: [], main: [] },
    };
  }

  filterIngredients(arr) {
    const ingredients = { bun: [], sauce: [], main: [] };

    arr.forEach((item) => {
      ingredients[item.type].push(item);
    });

    return ingredients;
  }

  componentDidMount() {
    const { ingredients = data } = this.props;

    const filteredIngredients = this.filterIngredients(ingredients);

    this.setState({ ...this.state, ingredients: filteredIngredients });
  }

  render() {
    const { ingredients } = this.state;

    return (
      <div className={styles.page}>
        <AppHeader />
        <main className={`${styles.main} pb-10`}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor
            bun={ingredients.bun[0]}
            ingredients={[...ingredients.sauce, ...ingredients.main]}
          />
        </main>
      </div>
    );
  }
}

export default App;
