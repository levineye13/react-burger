import React from 'react';

import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

function App() {
  return (
    <div className={style.page}>
      <AppHeader />
      <main>
        <BurgerIngredients />
      </main>
    </div>
  );
}

export default App;
