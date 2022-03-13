import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { API_BASE_URL, API_ENDPOINT } from '../../utils/constants';
import {
  setIngredients,
  setSortedIngredients,
  closeIngredient,
  setCurrentBun,
  setSelectedIngredients,
  closeOrder,
} from '../../services/actions';

function App() {
  const dispatch = useDispatch();

  const {
    list: ingredients,
    currentIngredient,
    order,
  } = useSelector((state) => ({
    list: state.ingredients.list,
    currentIngredient: state.currentIngredient,
    order: state.order,
  }));

  useEffect(() => {
    dispatch(setIngredients(`${API_BASE_URL}${API_ENDPOINT.ingredients}`));
  }, [dispatch]);

  useEffect(() => {
    function filterIngredients(arr) {
      const sorted = { bun: [], sauce: [], main: [] };

      arr.forEach((item) => {
        sorted[item.type].push(item);
      });

      return sorted;
    }

    const filteredIngredients = filterIngredients(ingredients);

    dispatch(setSortedIngredients(filteredIngredients));
  }, [ingredients, dispatch]);

  function closeModals() {
    dispatch(closeIngredient());
    dispatch(closeOrder());
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={`${styles.main} pb-10`}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      {currentIngredient.isOpen && (
        <Modal onClose={closeModals} title="Детали ингредиента">
          <IngredientDetails {...currentIngredient} />
        </Modal>
      )}
      {order.isOpen && (
        <Modal onClose={closeModals}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;