import {
  TAppThunk,
  TAppDispatch,
  TSortedIngredietns,
} from './../../utils/types';
import {
  SET_INGREDIENTS,
  SET_SORTED_INGREDIENTS,
  INCREMENT,
  DECREMENT,
  CLEAR_COUNTERS,
  INGREDIENTS_CONNECTION_START,
  INGREDIENTS_CONNECTION_FAILED,
  INGREDIENTS_CONNECTION_SUCCESS,
} from '../action-types';
import { api } from '../../utils/api';
import { IIngredient } from '../../utils/interfaces';

// ======= Actions =======

export interface ISetIngredients {
  readonly type: typeof SET_INGREDIENTS;
  readonly payload: IIngredient[];
}

export interface ISetSortedIngredients {
  readonly type: typeof SET_SORTED_INGREDIENTS;
  readonly payload: TSortedIngredietns;
}

export interface IIncrement {
  readonly type: typeof INCREMENT;
  readonly payload: IIngredient;
}

export interface IDecrement {
  readonly type: typeof DECREMENT;
  readonly payload: IIngredient;
}

export interface IClearCounters {
  readonly type: typeof CLEAR_COUNTERS;
}

export interface IIngredientsConectionStart {
  readonly type: typeof INGREDIENTS_CONNECTION_START;
}

export interface IIngredientsConectionSuccess {
  readonly type: typeof INGREDIENTS_CONNECTION_SUCCESS;
}

export interface IIngredientsConectionFailed {
  readonly type: typeof INGREDIENTS_CONNECTION_FAILED;
}

export type TBurgerIngredients =
  | ISetIngredients
  | ISetSortedIngredients
  | IIncrement
  | IDecrement
  | IClearCounters
  | IIngredientsConectionStart
  | IIngredientsConectionSuccess
  | IIngredientsConectionFailed;

// ======= Action Creators =======

export const setIngredients: TAppThunk =
  () => async (dispatch: TAppDispatch) => {
    dispatch(ingredientsStart());

    try {
      const ingredients = await api.getIngredients();

      if (ingredients && Array.isArray(ingredients)) {
        dispatch({ type: SET_INGREDIENTS, payload: ingredients });
        dispatch(ingredientsSuccess());
      }
    } catch (e) {
      dispatch(ingredientsFailed());
      console.error(e);
    }
  };

export const setSortedIngredients = (
  payload: TSortedIngredietns
): ISetSortedIngredients => ({
  type: SET_SORTED_INGREDIENTS,
  payload,
});

export const increment = (payload: IIngredient): IIncrement => ({
  type: INCREMENT,
  payload,
});

export const decrement = (payload: IIngredient): IDecrement => ({
  type: DECREMENT,
  payload,
});

export const clearCounters = (): IClearCounters => ({ type: CLEAR_COUNTERS });

export const ingredientsSuccess = (): IIngredientsConectionSuccess => ({
  type: INGREDIENTS_CONNECTION_SUCCESS,
});

export const ingredientsStart = (): IIngredientsConectionStart => ({
  type: INGREDIENTS_CONNECTION_START,
});

export const ingredientsFailed = (): IIngredientsConectionFailed => ({
  type: INGREDIENTS_CONNECTION_FAILED,
});
