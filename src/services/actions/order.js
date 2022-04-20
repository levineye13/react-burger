import { OPEN_ORDER, CLOSE_ORDER } from '../action-types';
import { clearIngredients, clearCounters } from './';
import { api } from '../../utils/api';

export const openOrder = (payload) => ({ type: OPEN_ORDER, payload });

export const closeOrder = () => ({ type: CLOSE_ORDER });

export const makeOrder = (ingredientsId) => async (dispatch) => {
  const data = await api.makeOrder(ingredientsId);

  if (data.success) {
    dispatch(
      openOrder({
        name: data.name,
        number: data.order.number,
      })
    );
    dispatch(clearIngredients());
    dispatch(clearCounters());
  } else {
    dispatch(closeOrder());
  }
};
