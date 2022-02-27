import React, { useState, useEffect } from 'react';

import styles from './app.module.css';
import { useFetch } from '../../hooks/useFetch';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { API_URL, ESC_CODE } from '../../utils/constants';

function App() {
  const [ingredients, setIngredients] = useState({
    bun: [],
    sauce: [],
    main: [],
  });
  const [isOpenIngredientModal, setIsOpenIngredientModal] = useState(false);
  const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);

  const { data, success } = useFetch(API_URL);

  useEffect(() => {
    if (success) {
      const filteredIngredients = filterIngredients(data);
      setIngredients(filteredIngredients);
    }
  }, [success, JSON.stringify(data)]);

  useEffect(() => {
    function handleClickEsc(e) {
      if (e.keyCode === ESC_CODE) {
        closeModals();
      }
    }

    document.addEventListener('keydown', handleClickEsc);

    return () => document.removeEventListener('keydown', handleClickEsc);
  }, []);

  function filterIngredients(arr) {
    const ingredients = { bun: [], sauce: [], main: [] };

    arr.forEach((item) => {
      ingredients[item.type].push(item);
    });

    return ingredients;
  }

  function closeModals() {
    setIsOpenIngredientModal(false);
    setIsOpenOrderModal(false);
    setIsOpenOverlay(false);
  }

  function handleIngredientClick(ingredient) {
    setCurrentIngredient(ingredient);
    setIsOpenIngredientModal(true);
    setIsOpenOverlay(true);
  }

  function handleOrderClick() {
    setIsOpenOrderModal(true);
    setIsOpenOverlay(true);
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={`${styles.main} pb-10`}>
        <BurgerIngredients
          ingredients={ingredients}
          onIngredientClick={handleIngredientClick}
          onClose={closeModals}
        />
        <BurgerConstructor
          bun={ingredients.bun[0]}
          ingredients={[...ingredients.sauce, ...ingredients.main]}
          onButtonClick={handleOrderClick}
        />
      </main>
      <ModalOverlay isOpen={isOpenOverlay} onClose={closeModals} />
      <Modal
        isOpen={isOpenIngredientModal}
        onClose={closeModals}
        title="Детали ингредиента"
      >
        <IngredientDetails {...currentIngredient} />
      </Modal>
      <Modal isOpen={isOpenOrderModal} onClose={closeModals}>
        <OrderDetails />
      </Modal>
    </div>
  );
}

export default App;
