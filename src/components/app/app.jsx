import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientPage from '../../pages/ingredient-page/ingredient-page';
import OrderDetails from '../order-details/order-details';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import Profile from '../../pages/profile/profile';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import ProtectedRoute from '../../hoc/protected-route';
import Cookie from '../../utils/cookie';
import {
  API_BASE_URL,
  API_ENDPOINT,
  PAGES,
  TOKEN_TYPE,
} from '../../utils/constants';
import {
  setIngredients,
  setSortedIngredients,
  closeOrder,
  setAuth,
  refreshToken,
} from '../../services/actions';

const {
  root,
  login,
  register,
  profile,
  forgotPassword,
  resetPassword,
  orders,
} = PAGES;
const { ingredients: ingredientsUrl } = API_ENDPOINT;
const { access } = TOKEN_TYPE;

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = history.location.state?.background;

  const { list: ingredients, order } = useSelector((state) => ({
    list: state.ingredients.list,
    currentIngredient: state.currentIngredient,
    order: state.order,
  }));

  useEffect(() => {
    const token = Cookie.get(access);

    if (!token) {
      dispatch(refreshToken());
    } else {
      dispatch(setAuth());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setIngredients(`${API_BASE_URL}${ingredientsUrl}`));
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

  function closeOrderModal() {
    dispatch(closeOrder());
  }

  function returnFromModal() {
    history.goBack();
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path={root} exact component={Main} />
        <ProtectedRoute exact path={profile}>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute exact path={orders}></ProtectedRoute>
        <Route path={login} component={Login} />
        <Route path={register} component={Register} />
        <Route path={forgotPassword} component={ForgotPassword} />
        <Route path={resetPassword} component={ResetPassword} />
        <Route path={`${ingredientsUrl}/:id`} exact>
          <IngredientPage />
        </Route>
        <Route>404</Route>
      </Switch>

      {background && (
        <Route path={`${ingredientsUrl}/:id`}>
          <Modal onClose={returnFromModal} title="Детали ингредиента">
            <IngredientDetails />
          </Modal>
        </Route>
      )}

      {order.isOpen && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
