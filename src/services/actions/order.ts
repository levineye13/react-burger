import { TAppThunk, TAppDispatch, TOrderResponce } from './../../utils/types';
import { OPEN_ORDER, CLOSE_ORDER, SET_ORDER } from '../action-types';
import { clearIngredients, clearCounters } from '.';
import { api } from '../../utils/api';
import { IIngredient } from '../../utils/interfaces';

// ======= Actions =======

export interface IOpenOrder {
  readonly type: typeof OPEN_ORDER;
  readonly payload: { name: string; number: number };
}

export interface ICloseOrder {
  readonly type: typeof CLOSE_ORDER;
}

export interface ISetOrder {
  readonly type: typeof SET_ORDER;
  readonly payload: TOrderResponce & {
    price?: number;
    filtered?: IIngredient[];
  };
}

export type TOrder = IOpenOrder | ICloseOrder | ISetOrder;

// ======= Action Creators =======

export const openOrder = (payload: {
  name: string;
  number: number;
}): IOpenOrder => ({
  type: OPEN_ORDER,
  payload,
});

export const closeOrder = (): ICloseOrder => ({ type: CLOSE_ORDER });

export const setOrder = (
  payload: TOrderResponce & {
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
      const data = await api.makeOrder(ingredientsId);

      if (data && data.success) {
        dispatch(
          openOrder({
            name: data.name || '',
            number: data.order?.number || 0,
          })
        );
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
