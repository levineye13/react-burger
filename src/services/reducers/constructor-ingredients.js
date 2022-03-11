import { SET_SELECTED_INGREDIENTS, SET_CURRENT_BUN } from '../actions';

const initialSelectedIngredients = {
  bun: {},
  ingredients: [],
};

export const burgerConstructorReducer = (
  state = initialSelectedIngredients,
  action
) => {
  switch (action.type) {
    case SET_CURRENT_BUN:
      return { ...state, bun: action.payload };

    case SET_SELECTED_INGREDIENTS:
      return { ...state, ingredients: action.payload };

    default:
      return state;
  }
};
