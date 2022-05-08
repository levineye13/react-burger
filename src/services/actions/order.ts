import { TAppThunk, TAppDispatch } from './../../utils/types';
import { OPEN_ORDER, CLOSE_ORDER, SET_ORDER } from '../action-types';
import { clearIngredients, clearCounters } from '.';
import { api } from '../../utils/api';

// ======= Actions =======

export interface IOpenOrder {
  readonly type: typeof OPEN_ORDER;
  readonly payload: {};
}

export interface ICloseOrder {
  readonly type: typeof CLOSE_ORDER;
}

export interface ISetOrder {
  readonly type: typeof SET_ORDER;
  readonly payload: {};
}

export type TOrder = IOpenOrder | ICloseOrder | ISetOrder;

// ======= Action Creators =======

export const openOrder = (payload: {}): IOpenOrder => ({
  type: OPEN_ORDER,
  payload,
});

export const closeOrder = (): ICloseOrder => ({ type: CLOSE_ORDER });

export const setOrder = (payload: {}): ISetOrder => ({
  type: SET_ORDER,
  payload,
});

export const makeOrder: TAppThunk =
  (ingredientsId: string[]) => async (dispatch: TAppDispatch) => {
    const data = await api.makeOrder(ingredientsId);

    if (data && data.success) {
      dispatch(
        openOrder({
          name: data.name,
          number: data.order?.number,
        })
      );
      dispatch(clearIngredients());
      dispatch(clearCounters());
    } else {
      dispatch(closeOrder());
    }
  };
