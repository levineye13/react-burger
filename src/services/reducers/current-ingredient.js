import { SET_INGREDIENT } from '../action-types';

const initialCurrentIngredient = {};

export const currentIngredientReducer = (
  state = initialCurrentIngredient,
  action
) => {
  switch (action.type) {
    case SET_INGREDIENT:
      return { ...action.payload };

    default:
      return state;
  }
};
