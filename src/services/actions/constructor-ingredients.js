import {
  SET_SELECTED_INGREDIENTS,
  SET_CURRENT_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from '../action-types';

export const setSelectedIngredients = (payload) => ({
  type: SET_SELECTED_INGREDIENTS,
  payload,
});

export const setCurrentBun = (payload) => ({ type: SET_CURRENT_BUN, payload });

export const addIngredient = (payload) => ({ type: ADD_INGREDIENT, payload });

export const deleteIngredient = (payload) => ({
  type: DELETE_INGREDIENT,
  payload,
});

export const moveIngredient = (payload) => ({ type: MOVE_INGREDIENT, payload });
