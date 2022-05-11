import { TOrderResponce } from './../../utils/types';
import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_HISTORY_CONNECTION_START,
  WS_HISTORY_CONNECTION_CLOSED,
  WS_HISTORY_CONNECTION_ERROR,
  WS_HISTORY_CONNECTION_SUCCESS,
  WS_GET_ALL_ORDERS,
  WS_GET_HISTORY_ORDERS,
} from '../action-types';
import { TWebSocket } from '../actions';

type TInitialWebSocket = {
  feedOrders: {
    list: ReadonlyArray<TOrderResponce>;
    wsConnected: boolean;
    total: number;
    totalToday: number;
  };
  historyOrders: {
    list: ReadonlyArray<TOrderResponce>;
    wsConnected: boolean;
    total: number;
    totalToday: number;
  };
};

const initialWebSocket: TInitialWebSocket = {
  feedOrders: {
    list: [],
    wsConnected: false,
    total: 0,
    totalToday: 0,
  },
  historyOrders: {
    list: [],
    wsConnected: false,
    total: 0,
    totalToday: 0,
  },
};

export const webSocketReducer = (
  state = initialWebSocket,
  action: TWebSocket
) => {
  switch (action.type) {
    case WS_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        feedOrders: { ...state.feedOrders, wsConnected: false },
      };

    case WS_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        feedOrders: { ...state.feedOrders, wsConnected: true },
      };

    case WS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        feedOrders: { ...state.feedOrders, wsConnected: false },
      };

    case WS_HISTORY_CONNECTION_CLOSED:
      return {
        ...state,
        historyOrders: { ...state.historyOrders, wsConnected: false },
      };

    case WS_HISTORY_CONNECTION_SUCCESS:
      return {
        ...state,
        historyOrders: { ...state.historyOrders, wsConnected: true },
      };

    case WS_HISTORY_CONNECTION_ERROR:
      return {
        ...state,
        historyOrders: { ...state.historyOrders, wsConnected: false },
      };

    case WS_GET_ALL_ORDERS: {
      const { success, orders, total, totalToday } = action.payload;

      return {
        ...state,
        feedOrders: {
          ...state.feedOrders,
          list: success ? orders : [],
          total,
          totalToday,
        },
      };
    }

    case WS_GET_HISTORY_ORDERS: {
      const { success, orders, total, totalToday } = action.payload;

      return {
        ...state,
        historyOrders: {
          ...state.historyOrders,
          list: success ? orders : [],
          total,
          totalToday,
        },
      };
    }

    case WS_FEED_CONNECTION_START:
    case WS_HISTORY_CONNECTION_START:
      return state;

    default:
      return state;
  }
};
