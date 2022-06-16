import { TOrderResponce } from '../../../utils/types';
import {
  OPEN_ORDER,
  CLOSE_ORDER,
  SET_ORDER,
  CLEAR_ORDER,
} from '../../action-types';
import { TOrder } from '../../actions/order';

type TOrderState = {
  readonly order: { [key in keyof TOrderResponce]: TOrderResponce[key] };
} & { readonly isOpen: boolean };

export const initialOrder: TOrderState = {
  isOpen: false,
  order: {
    _id: '0',
    ingredients: [],
    status: '',
    name: '',
    number: 0,
    createdAt: '',
    updatedAt: '',
  },
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

    case CLEAR_ORDER:
      return { ...state, order: initialOrder.order };

    default:
      return state;
  }
};
