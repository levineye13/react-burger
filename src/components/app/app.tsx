import React from 'react';

import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import data from '../../utils/data';

function App() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <main>
        <BurgerIngredients ingredients={data} />
      </main>
    </div>
  );
}

export default App;
