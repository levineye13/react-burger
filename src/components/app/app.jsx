import React, { useState, useEffect, useMemo } from 'react';

import styles from './app.module.css';
import { useFetch } from '../../hooks/useFetch';
import { IngredientsContext } from '../../services/IngredientsContext';
import { CurrentBunContext } from '../../services/CurrentBunContext';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { API_BASE_URL, API_ENDPOINT } from '../../utils/constants';

function App() {
  const [ingredients, setIngredients] = useState({
    bun: [],
    sauce: [],
    main: [],
  });
  const [isOpenIngredientModal, setIsOpenIngredientModal] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [currentBun, setCurrentBun] = useState({});
  const [orderNumber, setOrderNumber] = useState(null);

  const { data, success } = useFetch(
    `${API_BASE_URL}${API_ENDPOINT.ingredients}`
  );

  useEffect(() => {
    function filterIngredients(arr) {
      const ingredients = { bun: [], sauce: [], main: [] };

      arr.forEach((item) => {
        ingredients[item.type].push(item);
      });

      return ingredients;
    }

    if (success) {
      const filteredIngredients = filterIngredients(data);
      setIngredients(filteredIngredients);
      //! Временно, пока функционала выбора булочки нет
      setCurrentBun(filteredIngredients.bun[0]);
    }
  }, [success, JSON.stringify(data)]);

  function closeModals() {
    setIsOpenIngredientModal(false);
    setOrderNumber(null);
  }

  function handleIngredientClick(ingredient) {
    setCurrentIngredient(ingredient);
    setIsOpenIngredientModal(true);
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <IngredientsContext.Provider value={ingredients}>
        <CurrentBunContext.Provider value={currentBun}>
          <main className={`${styles.main} pb-10`}>
            <BurgerIngredients onIngredientClick={handleIngredientClick} />
            <BurgerConstructor setOrderNumber={setOrderNumber} />
          </main>
        </CurrentBunContext.Provider>
      </IngredientsContext.Provider>
      {isOpenIngredientModal && (
        <Modal onClose={closeModals} title="Детали ингредиента">
          <IngredientDetails {...currentIngredient} />
        </Modal>
      )}
      {orderNumber && (
        <Modal onClose={closeModals}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
}

export default App;
