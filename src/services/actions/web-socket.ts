import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_ALL_ORDERS,
  WS_GET_HISTORY_ORDERS,
} from '../action-types';

import { TWSResponce } from '../../utils/types';

// ======= Actions =======

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsGetAllOrders {
  readonly type: typeof WS_GET_ALL_ORDERS;
  readonly payload: TWSResponce;
}

export interface IWsGetHistoryOrders {
  readonly type: typeof WS_GET_HISTORY_ORDERS;
}

export type TWebSocket =
  | IWsConnectionStart
  | IWsConnectionClosed
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsGetAllOrders
  | IWsGetHistoryOrders;

// ======= Action Creators =======

export const wsConnectionStart = (): IWsConnectionStart => ({
  type: WS_CONNECTION_START,
});

export const wsConnectionClosed = (): IWsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsConnectionSuccess = (): IWsConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS,
});

export const wsConnectionError = (): IWsConnectionError => ({
  type: WS_CONNECTION_ERROR,
});

export const wsGetAllOrders = (payload: TWSResponce): IWsGetAllOrders => ({
  type: WS_GET_ALL_ORDERS,
  payload,
});

export const wsGetHistoryOrders = (): IWsGetHistoryOrders => ({
  type: WS_GET_HISTORY_ORDERS,
});
