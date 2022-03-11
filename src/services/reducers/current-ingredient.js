import { OPEN_INGREDIENT, CLOSE_INGREDIENT } from '../actions';

const initialCurrentIngredient = {
  isOpen: false,
};

export const currentIngredientReducer = (
  state = initialCurrentIngredient,
  action
) => {
  switch (action.type) {
    case OPEN_INGREDIENT:
      return { ...action.payload, isOpen: true };

    case CLOSE_INGREDIENT:
      return { isOpen: false };

    default:
      return state;
  }
};
