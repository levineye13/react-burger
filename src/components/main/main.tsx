import React, { FC, ReactElement } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const Main: FC = (): ReactElement => {
  return (
    <main className={`${styles.main} pb-10`}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
};

export default Main;
