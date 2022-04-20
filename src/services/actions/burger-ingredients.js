import {
  SET_INGREDIENTS,
  SET_SORTED_INGREDIENTS,
  INCREMENT,
  DECREMENT,
  CLEAR_COUNTERS,
} from '../action-types';
import { api } from '../../utils/api';

export const setIngredients = () => async (dispatch) => {
  const ingredients = await api.getIngredients();

  if (ingredients && Array.isArray(ingredients)) {
    dispatch({ type: SET_INGREDIENTS, payload: ingredients });
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

export const clearCounters = () => ({ type: CLEAR_COUNTERS });
