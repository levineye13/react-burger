import { OPEN_ORDER, CLOSE_ORDER, SET_ORDER } from '../action-types';
import { TOrder } from '../actions/order';

type TOrderState = {
  readonly isOpen: boolean;
  readonly name?: string;
  readonly number?: number;
};

const initialOrder: TOrderState = {
  isOpen: false,
};

export const orderReducer = (
  state = initialOrder,
  action: TOrder
): TOrderState => {
  switch (action.type) {
    case OPEN_ORDER:
      return { ...action.payload, isOpen: true };

    case CLOSE_ORDER:
      return { isOpen: false };

    case SET_ORDER:
      return { ...action.payload, isOpen: false };

    default:
      return state;
  }
};
