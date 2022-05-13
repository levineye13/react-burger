import { TOrderResponce } from './../../utils/types';
import { OPEN_ORDER, CLOSE_ORDER, SET_ORDER } from '../action-types';
import { TOrder } from '../actions/order';

type TOrderState = {
  readonly order: { [key in keyof TOrderResponce]?: TOrderResponce[key] };
} & { readonly isOpen: boolean };

const initialOrder: TOrderState = {
  isOpen: false,
  order: {},
};

export const orderReducer = (
  state = initialOrder,
  action: TOrder
): TOrderState => {
  switch (action.type) {
    case OPEN_ORDER:
      return { order: { ...state.order, ...action.payload }, isOpen: true };

    case CLOSE_ORDER:
      return { ...state, isOpen: false };

    case SET_ORDER:
      return { order: action.payload, isOpen: false };

    default:
      return state;
  }
};
