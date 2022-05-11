import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_SUCCESS,
  WS_HISTORY_CONNECTION_START,
  WS_HISTORY_CONNECTION_CLOSED,
  WS_HISTORY_CONNECTION_ERROR,
  WS_HISTORY_CONNECTION_SUCCESS,
  WS_GET_ALL_ORDERS,
  WS_GET_HISTORY_ORDERS,
  WS_SEND_MESSAGE,
} from './action-types/web-socket';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers';
import { socketMiddleware } from '../services/middleware';
import { WsApi } from '../utils/constants';
import { TWsActions } from '../utils/types';

const wsFeedActions: TWsActions = {
  wsStart: WS_FEED_CONNECTION_START,
  wsClosed: WS_FEED_CONNECTION_CLOSED,
  wsError: WS_FEED_CONNECTION_ERROR,
  wsSuccess: WS_FEED_CONNECTION_SUCCESS,
  wsMessage: WS_GET_ALL_ORDERS,
  wsSendMessage: WS_SEND_MESSAGE,
};

const wsHistoryActions: TWsActions = {
  wsStart: WS_HISTORY_CONNECTION_START,
  wsClosed: WS_HISTORY_CONNECTION_CLOSED,
  wsError: WS_HISTORY_CONNECTION_ERROR,
  wsSuccess: WS_HISTORY_CONNECTION_SUCCESS,
  wsMessage: WS_GET_HISTORY_ORDERS,
  wsSendMessage: WS_SEND_MESSAGE,
};

const composeEnhancers = composeWithDevTools(
  applyMiddleware(
    thunk,
    socketMiddleware(WsApi.OrdersAll, wsFeedActions),
    socketMiddleware(WsApi.OrdersHistory, wsHistoryActions, { withToken: true })
  )
);

export const store = createStore(rootReducer, composeEnhancers);
