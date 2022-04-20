import React, { FC, ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { Location } from 'history';

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
import { ApiEndpoints, Pages, TokenType } from '../../utils/constants';
import {
  setIngredients,
  setSortedIngredients,
  closeOrder,
  setAuth,
  refreshToken,
} from '../../services/actions';
import { IIngredient } from '../../utils/interfaces';
import { TSortedIngredietns } from '../../utils/types';

const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<{ background: Location }>();
  const background = location.state?.background;

  const { list: ingredients, order } = useSelector((state: any) => ({
    list: state.ingredients.list,
    order: state.order,
  }));

  useEffect(() => {
    const token = Cookie.get(TokenType.Access);

    if (!token) {
      dispatch(refreshToken());
    } else {
      dispatch(setAuth());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setIngredients());
  }, [dispatch]);

  useEffect(() => {
    const filterIngredients = (arr: IIngredient[]): TSortedIngredietns => {
      const sorted: TSortedIngredietns = {
        bun: [],
        sauce: [],
        main: [],
      };

      arr.forEach((item: IIngredient) => {
        sorted[item.type].push(item);
      });

      return sorted;
    };

    const filteredIngredients: TSortedIngredietns =
      filterIngredients(ingredients);

    dispatch(setSortedIngredients(filteredIngredients));
  }, [ingredients, dispatch]);

  const closeOrderModal = (): void => {
    dispatch(closeOrder());
  };

  const returnFromModal = (): void => {
    history.goBack();
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path={Pages.Root} exact component={Main} />
        <ProtectedRoute exact path={Pages.Profile}>
          <Profile />
        </ProtectedRoute>
        {/* <ProtectedRoute exact path={orders}></ProtectedRoute> */}
        <Route path={Pages.Login} component={Login} />
        <Route path={Pages.Register} component={Register} />
        <Route path={Pages.ForgotPassword} component={ForgotPassword} />
        <Route path={Pages.ResetPassword} component={ResetPassword} />
        <Route path={`${ApiEndpoints.Ingredients}/:id`} exact>
          <IngredientPage />
        </Route>
        <Route>404</Route>
      </Switch>

      {background && (
        <Route path={`${ApiEndpoints.Ingredients}/:id`}>
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
};

export default App;
