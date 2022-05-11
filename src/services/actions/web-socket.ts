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
} from '../action-types';

import { TWSResponce } from '../../utils/types';

// ======= Actions =======

export interface IWsFeedConnectionStart {
  readonly type: typeof WS_FEED_CONNECTION_START;
}

export interface IWsFeedConnectionClosed {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}

export interface IWsFeedConnectionSuccess {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}

export interface IWsFeedConnectionError {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
}

export interface IWsHistoryConnectionStart {
  readonly type: typeof WS_HISTORY_CONNECTION_START;
}

export interface IWsHistoryConnectionClosed {
  readonly type: typeof WS_HISTORY_CONNECTION_CLOSED;
}

export interface IWsHistoryConnectionSuccess {
  readonly type: typeof WS_HISTORY_CONNECTION_SUCCESS;
}

export interface IWsHistoryConnectionError {
  readonly type: typeof WS_HISTORY_CONNECTION_ERROR;
}

export interface IWsGetAllOrders {
  readonly type: typeof WS_GET_ALL_ORDERS;
  readonly payload: TWSResponce;
}

export interface IWsGetHistoryOrders {
  readonly type: typeof WS_GET_HISTORY_ORDERS;
  readonly payload: TWSResponce;
}

export type TWebSocket =
  | IWsFeedConnectionStart
  | IWsFeedConnectionClosed
  | IWsFeedConnectionSuccess
  | IWsFeedConnectionError
  | IWsHistoryConnectionStart
  | IWsHistoryConnectionClosed
  | IWsHistoryConnectionSuccess
  | IWsHistoryConnectionError
  | IWsGetAllOrders
  | IWsGetHistoryOrders;

// ======= Action Creators =======

export const wsFeedConnectionStart = (): IWsFeedConnectionStart => ({
  type: WS_FEED_CONNECTION_START,
});

export const wsFeedConnectionClosed = (): IWsFeedConnectionClosed => ({
  type: WS_FEED_CONNECTION_CLOSED,
});

export const wsFeedConnectionSuccess = (): IWsFeedConnectionSuccess => ({
  type: WS_FEED_CONNECTION_SUCCESS,
});

export const wsFeedConnectionError = (): IWsFeedConnectionError => ({
  type: WS_FEED_CONNECTION_ERROR,
});

export const wsHistoryConnectionStart = (): IWsHistoryConnectionStart => ({
  type: WS_HISTORY_CONNECTION_START,
});

export const wsHistoryConnectionClosed = (): IWsHistoryConnectionClosed => ({
  type: WS_HISTORY_CONNECTION_CLOSED,
});

export const wsHistoryConnectionSuccess = (): IWsHistoryConnectionSuccess => ({
  type: WS_HISTORY_CONNECTION_SUCCESS,
});

export const wsHistoryConnectionError = (): IWsHistoryConnectionError => ({
  type: WS_HISTORY_CONNECTION_ERROR,
});

export const wsGetAllOrders = (payload: TWSResponce): IWsGetAllOrders => ({
  type: WS_GET_ALL_ORDERS,
  payload,
});

export const wsGetHistoryOrders = (
  payload: TWSResponce
): IWsGetHistoryOrders => ({
  type: WS_GET_HISTORY_ORDERS,
  payload,
});
