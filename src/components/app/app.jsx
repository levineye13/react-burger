import React, { useState, useEffect, useReducer } from 'react';

import styles from './app.module.css';
import { useFetch } from '../../hooks/useFetch';
import { IngredientsContext } from '../../services/IngredientsContext';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { API_BASE_URL, API_ENDPOINT, HTTP_METHOD } from '../../utils/constants';

const initialState = { sum: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'setSum':
      return { ...state, sum: action.payload };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function App() {
  const [sumState, sumDispatcher] = useReducer(reducer, initialState);

  const [ingredients, setIngredients] = useState({
    bun: [],
    sauce: [],
    main: [],
  });
  const [isOpenIngredientModal, setIsOpenIngredientModal] = useState(false);
  const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [currentBun, setCurrentBun] = useState({});
  const [orderNumber, setOrderNumber] = useState(null);

  const { data, success } = useFetch(
    `${API_BASE_URL}${API_ENDPOINT.ingredients}`
  );

  useEffect(() => {
    if (success) {
      const filteredIngredients = filterIngredients(data);
      setIngredients(filteredIngredients);
      //! Временно, пока функционала выбора булочки нет
      setCurrentBun(filteredIngredients.bun[0]);
    }
  }, [success, JSON.stringify(data)]);

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
  }

  function handleIngredientClick(ingredient) {
    setCurrentIngredient(ingredient);
    setIsOpenIngredientModal(true);
  }

  async function handleOrderClick(ingredientsId) {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINT.orders}`, {
      method: HTTP_METHOD.post,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: ingredientsId,
      }),
    });

    if (!res.ok) {
      throw new Error(`${res.status} - ${res.statusText}`);
    }

    setIsOpenOrderModal(true);

    return res.json();
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <IngredientsContext.Provider
        value={{
          ingredients,
          currentBun,
          sum: sumState.sum,
          sumDispatcher,
        }}
      >
        <main className={`${styles.main} pb-10`}>
          <BurgerIngredients
            onIngredientClick={handleIngredientClick}
            onClose={closeModals}
          />
          <BurgerConstructor
            onButtonClick={handleOrderClick}
            setOrderNumber={setOrderNumber}
          />
        </main>
      </IngredientsContext.Provider>
      {isOpenIngredientModal && (
        <Modal onClose={closeModals} title="Детали ингредиента">
          <IngredientDetails {...currentIngredient} />
        </Modal>
      )}
      {isOpenOrderModal && orderNumber && (
        <Modal onClose={closeModals}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
}

export default App;
