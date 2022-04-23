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

export type TBurgerIngredients =
  | ISetIngredients
  | ISetSortedIngredients
  | IIncrement
  | IDecrement
  | IClearCounters;

// ======= Action Creators =======

export const setIngredients: TAppThunk =
  () => async (dispatch: TAppDispatch) => {
    const ingredients = await api.getIngredients();

    if (ingredients && Array.isArray(ingredients)) {
      dispatch({ type: SET_INGREDIENTS, payload: ingredients });
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
