import { TBurgerIngredients } from '../../actions/burger-ingredients';
import { IIngredient } from '../../../utils/interfaces';
import { TSortedIngredietns } from '../../../utils/types';
import { IngredientType } from '../../../utils/constants';
import {
  SET_INGREDIENTS,
  SET_SORTED_INGREDIENTS,
  INCREMENT,
  DECREMENT,
  CLEAR_COUNTERS,
  INGREDIENTS_CONNECTION_START,
  INGREDIENTS_CONNECTION_SUCCESS,
  INGREDIENTS_CONNECTION_FAILED,
} from '../../action-types';

type TIngredientsState = {
  readonly list: ReadonlyArray<IIngredient>;
  readonly sortedIngredients: TSortedIngredietns;
  readonly ingredientsCount: {
    [key: string]: string | number | { [key: string]: number };
  };
  ingredientsSuccess: boolean;
  ingredientsFailed: boolean;
  ingredientsStart: boolean;
};

export const initialIngredients: TIngredientsState = {
  list: [],
  sortedIngredients: { bun: [], sauce: [], main: [] },
  ingredientsCount: { bun: {} },
  ingredientsSuccess: false,
  ingredientsFailed: false,
  ingredientsStart: false,
};

export const ingredientsReducer = (
  state = initialIngredients,
  action: TBurgerIngredients
): TIngredientsState => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return { ...state, list: action.payload };

    case SET_SORTED_INGREDIENTS:
      return { ...state, sortedIngredients: action.payload };

    case INCREMENT: {
      const ingredientCount = state.ingredientsCount[action.payload._id];

      if (action.payload.type === IngredientType.Bun) {
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
          [action.payload._id]:
            typeof ingredientCount === 'number' ? ingredientCount + 1 : 1,
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
            typeof ingredientCount === 'number' && ingredientCount > 0
              ? ingredientCount - 1
              : ingredientCount,
        },
      };
    }

    case CLEAR_COUNTERS:
      return {
        ...state,
        ingredientsCount: initialIngredients.ingredientsCount,
      };

    case INGREDIENTS_CONNECTION_START:
      return {
        ...state,
        ingredientsStart: true,
        ingredientsSuccess: false,
        ingredientsFailed: false,
      };

    case INGREDIENTS_CONNECTION_SUCCESS:
      return {
        ...state,
        ingredientsStart: false,
        ingredientsSuccess: true,
        ingredientsFailed: false,
      };

    case INGREDIENTS_CONNECTION_FAILED:
      return {
        ...state,
        ingredientsStart: false,
        ingredientsSuccess: false,
        ingredientsFailed: true,
      };

    default:
      return state;
  }
};
