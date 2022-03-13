import { OPEN_ORDER, CLOSE_ORDER } from '../action-types';
import {
  API_BASE_URL,
  API_ENDPOINT,
  HTTP_METHOD,
  HEADERS,
} from '../../utils/constants';
import { clearIngredients } from './';

export const openOrder = (payload) => ({ type: OPEN_ORDER, payload });

export const closeOrder = () => ({ type: CLOSE_ORDER });

export const makeOrder = (ingredientsId) => async (dispatch) => {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINT.orders}`, {
      method: HTTP_METHOD.post,
      headers: HEADERS,
      body: JSON.stringify({
        ingredients: ingredientsId,
      }),
    });

    if (!res.ok) {
      dispatch(closeOrder());
      throw new Error(`${res.status} - ${res.statusText}`);
    }

    const dataOrder = await res.json();

    if (dataOrder.success) {
      dispatch(
        openOrder({
          name: dataOrder.name,
          number: dataOrder.order.number,
        })
      );
      dispatch(clearIngredients());
    } else {
      dispatch(closeOrder());
    }
  } catch (e) {
    console.error(e);
  }
};
