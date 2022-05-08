import { TOrderResponce } from './../../utils/types';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_ALL_ORDERS,
  WS_GET_HISTORY_ORDERS,
} from '../action-types';
import { TWebSocket } from '../actions';

type TInitialWebSocket = {
  wsConnected: boolean;
  allOrders: ReadonlyArray<TOrderResponce>;
  total: number;
  totalToday: number;
};

const initialWebSocket: TInitialWebSocket = {
  wsConnected: false,
  allOrders: [],
  total: 0,
  totalToday: 0,
};

export const webSocketReducer = (
  state = initialWebSocket,
  action: TWebSocket
) => {
  switch (action.type) {
    case WS_CONNECTION_CLOSED:
      return { ...state, wsConnected: false };

    case WS_CONNECTION_SUCCESS:
      return { ...state, wsConnected: true };

    case WS_CONNECTION_ERROR:
      return { ...state, wsConnected: false };

    case WS_GET_ALL_ORDERS: {
      const { success, orders, total, totalToday } = action.payload;

      return {
        ...state,
        allOrders: success ? orders : [],
        total,
        totalToday,
      };
    }

    case WS_CONNECTION_START:
    case WS_GET_HISTORY_ORDERS:
      return state;

    default:
      return state;
  }
};
