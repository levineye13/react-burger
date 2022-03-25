import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import Profile from '../../pages/profile/profile';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import ProtectedRoute from '../../hoc/protected-route';
import { API_BASE_URL, API_ENDPOINT, PAGES } from '../../utils/constants';
import {
  setIngredients,
  setSortedIngredients,
  closeIngredient,
  closeOrder,
} from '../../services/actions';

const { root, login, register, profile, forgotPassword, resetPassword } = PAGES;

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
      <Switch>
        <ProtectedRoute path={root} exact component={Main} />
        <ProtectedRoute path={profile} component={Profile} />
        <Route path={login} component={Login} />
        <Route path={register} component={Register} />
        <Route path={forgotPassword} component={ForgotPassword} />
        <Route path={resetPassword} component={ResetPassword} />
      </Switch>
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
