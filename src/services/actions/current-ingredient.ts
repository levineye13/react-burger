import { IIngredient } from './../../utils/interfaces';
import { SET_INGREDIENT } from '../action-types';

// ======= Actions =======

export interface ISetIngredient {
  readonly type: typeof SET_INGREDIENT;
  readonly payload: IIngredient;
}

export type TCurrentIngredient = ISetIngredient;

// ======= Action Creators =======

export const setIngredient = (payload: IIngredient): ISetIngredient => ({
  type: SET_INGREDIENT,
  payload,
});
