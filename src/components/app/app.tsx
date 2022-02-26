import React, { useState, useEffect } from 'react';

import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useFetch } from '../../hooks/useFetch';
import { API_URL } from '../../utils/constants';

function App() {
  const [ingredients, setIngredients] = useState({
    bun: [],
    sauce: [],
    main: [],
  });

  const { data, success } = useFetch(API_URL);

  useEffect(() => {
    if (success) {
      const filteredIngredients = filterIngredients(data);
      setIngredients(filteredIngredients);
    }
  }, [success, JSON.stringify(data)]);

  function filterIngredients(arr) {
    const ingredients = { bun: [], sauce: [], main: [] };

    arr.forEach((item) => {
      ingredients[item.type].push(item);
    });

    return ingredients;
  }

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

export default App;
