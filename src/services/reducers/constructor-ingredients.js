import {
  SET_SELECTED_INGREDIENTS,
  SET_CURRENT_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
} from '../actions';

import { INGREDIENT_TYPE } from '../../utils/constants';

const { bun } = INGREDIENT_TYPE;

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

    case ADD_INGREDIENT: {
      return {
        ...state,
        bun: action.payload.type === bun ? action.payload : state.bun,
        ingredients:
          action.payload.type !== bun
            ? [...state.ingredients, action.payload]
            : state.ingredients,
      };
    }

    case DELETE_INGREDIENT: {
      const index = state.ingredients.findIndex(
        (item) => item._id === action.payload
      );

      return {
        ...state,
        ingredients:
          index !== -1
            ? [
                ...state.ingredients.slice(0, index),
                ...state.ingredients.slice(index + 1),
              ]
            : state.ingredients,
      };
    }

    default:
      return state;
  }
};
