export const SET_SELECTED_INGREDIENTS = 'SET_SELECTED_INGREDIENTS';
export const SET_CURRENT_BUN = 'SET_CURRENT_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

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
