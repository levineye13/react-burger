export const SET_SELECTED_INGREDIENTS = 'SET_SELECTED_INGREDIENTS';
export const SET_CURRENT_BUN = 'SET_CURRENT_BUN';

export const setSelectedIngredients = (payload) => ({
  type: SET_SELECTED_INGREDIENTS,
  payload,
});

export const setCurrentBun = (payload) => ({ type: SET_CURRENT_BUN, payload });
