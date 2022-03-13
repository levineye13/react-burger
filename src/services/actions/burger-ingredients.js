import {
  SET_INGREDIENTS,
  SET_SORTED_INGREDIENTS,
  INCREMENT,
  DECREMENT,
} from '../action-types';
import { HTTP_METHOD, HEADERS } from '../../utils/constants';

export const setIngredients = (url) => async (dispatch) => {
  try {
    const res = await fetch(url, {
      method: HTTP_METHOD.get,
      headers: HEADERS,
    });

    if (!res.ok) {
      throw res;
    }

    const { data } = await res.json();

    dispatch({ type: SET_INGREDIENTS, payload: data });
  } catch (e) {
    console.error(e);
  }
};

export const setSortedIngredients = (payload) => ({
  type: SET_SORTED_INGREDIENTS,
  payload,
});

export const increment = (payload) => ({
  type: INCREMENT,
  payload,
});

export const decrement = (payload) => ({
  type: DECREMENT,
  payload,
});
