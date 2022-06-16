import { TAppThunk, TAppDispatch, TOrderResponce } from './../../utils/types';
import {
  OPEN_ORDER,
  CLOSE_ORDER,
  SET_ORDER,
  GET_ORDER,
  CLEAR_ORDER,
} from '../action-types';
import { clearIngredients, clearCounters } from '.';
import { api } from '../../utils/api';
import { IIngredient } from '../../utils/interfaces';

// ======= Actions =======

export interface IOpenOrder {
  readonly type: typeof OPEN_ORDER;
}

export interface ICloseOrder {
  readonly type: typeof CLOSE_ORDER;
}

export interface IClearOrder {
  readonly type: typeof CLEAR_ORDER;
}

export interface ISetOrder {
  readonly type: typeof SET_ORDER;
  readonly payload: { [key in keyof TOrderResponce]: TOrderResponce[key] } & {
    price?: number;
    filtered?: IIngredient[];
  };
}

export interface IGetOrder {
  readonly type: typeof GET_ORDER;
}

export type TOrder =
  | IOpenOrder
  | ICloseOrder
  | ISetOrder
  | IGetOrder
  | IClearOrder;

// ======= Action Creators =======

export const openOrder = (): IOpenOrder => ({ type: OPEN_ORDER });

export const closeOrder = (): ICloseOrder => ({ type: CLOSE_ORDER });

export const clearOrder = () => ({ type: CLEAR_ORDER });

export const setOrder = (
  payload: { [key in keyof TOrderResponce]: TOrderResponce[key] } & {
    price?: number;
    filtered?: IIngredient[];
  }
): ISetOrder => ({
  type: SET_ORDER,
  payload,
});

export const makeOrder: TAppThunk =
  (ingredientsId: string[]) => async (dispatch: TAppDispatch) => {
    try {
      dispatch(openOrder());

      const data = await api.makeOrder(ingredientsId);

      if (data.success && data.order) {
        dispatch(setOrder(data.order));
        dispatch(clearIngredients());
        dispatch(clearCounters());
      } else {
        dispatch(closeOrder());
      }
    } catch (e) {
      dispatch(closeOrder());
      console.error(e);
    }
  };

export const getOrder: TAppThunk =
  (number: string) => async (dispatch: TAppDispatch) => {
    try {
      const data = await api.getOrder(number);

      if (data.success && Array.isArray(data.orders)) {
        dispatch(setOrder(data.orders[0]));
      }
    } catch (e) {
      console.error(e);
    }
  };
