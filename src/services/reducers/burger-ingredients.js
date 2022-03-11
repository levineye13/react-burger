import { SET_INGREDIENTS, SET_SORTED_INGREDIENTS } from '../actions';

const initialIngredients = {
  list: [],
  sortedIngredients: { bun: [], sauce: [], main: [] },
};

export const ingredientsReducer = (state = initialIngredients, action) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return { ...state, list: action.payload };

    case SET_SORTED_INGREDIENTS:
      return { ...state, sortedIngredients: action.payload };

    default:
      return state;
  }
};
