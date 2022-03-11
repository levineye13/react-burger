import { OPEN_ORDER, CLOSE_ORDER } from '../actions';

const initialOrder = {
  isOpen: false,
};

export const orderReducer = (state = initialOrder, action) => {
  switch (action.type) {
    case OPEN_ORDER:
      return { ...action.payload, isOpen: true };

    case CLOSE_ORDER:
      return { isOpen: false };

    default:
      return state;
  }
};
