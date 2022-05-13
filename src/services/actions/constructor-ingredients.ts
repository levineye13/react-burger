import { v4 as uuidv4 } from 'uuid';
import { IngredientType } from '../../utils/constants';
import { IIngredient } from '../../utils/interfaces';

import {
  SET_SELECTED_INGREDIENTS,
  SET_CURRENT_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  CLEAR_INGREDIENTS,
} from '../action-types';

// ======= Actions =======

export interface ISetSelectedIngredients {
  readonly type: typeof SET_SELECTED_INGREDIENTS;
  readonly payload: IIngredient[];
}

export interface ISetCurrentBun {
  readonly type: typeof SET_CURRENT_BUN;
  readonly payload: IIngredient;
}

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: IIngredient;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: string | number;
}

export interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT;
  readonly payload: {
    dragIndex: number;
    targetIndex: number;
  };
}

export interface IClearIngredients {
  readonly type: typeof CLEAR_INGREDIENTS;
}

export type TConstructorIngredients =
  | ISetSelectedIngredients
  | ISetCurrentBun
  | IAddIngredient
  | IDeleteIngredient
  | IMoveIngredient
  | IClearIngredients;

// ======= Action Creators =======

export const setSelectedIngredients = (
  payload: IIngredient[]
): ISetSelectedIngredients => ({
  type: SET_SELECTED_INGREDIENTS,
  payload,
});

export const setCurrentBun = (payload: IIngredient): ISetCurrentBun => ({
  type: SET_CURRENT_BUN,
  payload,
});

export const addIngredient = (payload: IIngredient): IAddIngredient => ({
  type: ADD_INGREDIENT,
  payload: { ...payload, uuid: uuidv4() },
});

export const deleteIngredient = (
  payload: string | number
): IDeleteIngredient => ({
  type: DELETE_INGREDIENT,
  payload,
});

export const moveIngredient = (payload: {
  dragIndex: number;
  targetIndex: number;
}): IMoveIngredient => ({
  type: MOVE_INGREDIENT,
  payload,
});

export const clearIngredients = (): IClearIngredients => ({
  type: CLEAR_INGREDIENTS,
});
