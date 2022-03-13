import {
  SET_INGREDIENTS,
  SET_SORTED_INGREDIENTS,
  INCREMENT,
  DECREMENT,
} from '../action-types';

const initialIngredients = {
  list: [],
  sortedIngredients: { bun: [], sauce: [], main: [] },
  ingredientsCount: { bun: {} },
};

export const ingredientsReducer = (state = initialIngredients, action) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return { ...state, list: action.payload };

    case SET_SORTED_INGREDIENTS:
      return { ...state, sortedIngredients: action.payload };

    case INCREMENT: {
      const ingredientCount = state.ingredientsCount[action.payload._id];

      if (action.payload.type === 'bun') {
        return {
          ...state,
          ingredientsCount: {
            ...state.ingredientsCount,
            bun: {
              [action.payload._id]: 1,
            },
          },
        };
      }

      return {
        ...state,
        ingredientsCount: {
          ...state.ingredientsCount,
          bun: {
            ...state.ingredientsCount.bun,
          },
          [action.payload._id]: ingredientCount ? ingredientCount + 1 : 1,
        },
      };
    }

    case DECREMENT: {
      const ingredientCount = state.ingredientsCount[action.payload._id];

      if (ingredientCount === 1) {
        const newIngredientsCount = { ...state.ingredientsCount };
        delete newIngredientsCount[action.payload._id];

        return {
          ...state,
          ingredientsCount: newIngredientsCount,
        };
      }

      return {
        ...state,
        ingredientsCount: {
          ...state.ingredientsCount,
          [action.payload._id]:
            ingredientCount > 0 ? ingredientCount - 1 : ingredientCount,
        },
      };
    }

    default:
      return state;
  }
};
