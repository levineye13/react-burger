import { TOrderResponce } from '../../../utils/types';
import { OPEN_ORDER, CLOSE_ORDER, SET_ORDER } from '../../action-types';
import { TOrder } from '../../actions/order';

type TOrderState = {
  readonly order: { [key in keyof TOrderResponce]?: TOrderResponce[key] };
} & { readonly isOpen: boolean };

export const initialOrder: TOrderState = {
  isOpen: false,
  order: {},
};

export const orderReducer = (
  state = initialOrder,
  action: TOrder
): TOrderState => {
  switch (action.type) {
    case OPEN_ORDER:
      return { ...state, isOpen: true };

    case CLOSE_ORDER:
      return { ...state, isOpen: false };

    case SET_ORDER:
      return { ...state, order: action.payload };

    default:
      return state;
  }
};
