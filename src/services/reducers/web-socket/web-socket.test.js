import { webSocketReducer, initialWebSocket } from './web-socket';
import * as types from '../../action-types/web-socket';
import * as actions from '../../actions/web-socket';

describe('web socket reducer', () => {
  it('should return initial state', () => {
    expect(webSocketReducer(undefined, {})).toEqual(initialWebSocket);
  });

  it(`should return ${types.WS_FEED_CONNECTION_SUCCESS}`, () => {
    expect(
      webSocketReducer(initialWebSocket, actions.wsFeedConnectionSuccess())
    ).toEqual({
      ...initialWebSocket,
      feedOrders: { ...initialWebSocket.feedOrders, wsConnected: true },
    });
  });

  it(`should return ${types.WS_FEED_CONNECTION_CLOSED}`, () => {
    expect(
      webSocketReducer(initialWebSocket, actions.wsFeedConnectionClosed())
    ).toEqual({
      ...initialWebSocket,
      feedOrders: { ...initialWebSocket.feedOrders, wsConnected: false },
    });
  });

  it(`should return ${types.WS_FEED_CONNECTION_ERROR}`, () => {
    expect(
      webSocketReducer(initialWebSocket, actions.wsFeedConnectionError())
    ).toEqual({
      ...initialWebSocket,
      feedOrders: { ...initialWebSocket.feedOrders, wsConnected: false },
    });
  });

  it(`should return ${types.WS_HISTORY_CONNECTION_SUCCESS}`, () => {
    expect(
      webSocketReducer(initialWebSocket, actions.wsHistoryConnectionSuccess())
    ).toEqual({
      ...initialWebSocket,
      historyOrders: { ...initialWebSocket.historyOrders, wsConnected: true },
    });
  });

  it(`should return ${types.WS_HISTORY_CONNECTION_CLOSED}`, () => {
    expect(
      webSocketReducer(initialWebSocket, actions.wsHistoryConnectionClosed())
    ).toEqual({
      ...initialWebSocket,
      historyOrders: { ...initialWebSocket.historyOrders, wsConnected: false },
    });
  });

  it(`should return ${types.WS_HISTORY_CONNECTION_ERROR}`, () => {
    expect(
      webSocketReducer(initialWebSocket, actions.wsHistoryConnectionError())
    ).toEqual({
      ...initialWebSocket,
      historyOrders: { ...initialWebSocket.historyOrders, wsConnected: false },
    });
  });

  it(`should return ${types.WS_GET_ALL_ORDERS} if success request`, () => {
    expect(
      webSocketReducer(
        initialWebSocket,
        actions.wsGetAllOrders({
          success: true,
          orders: [
            {
              ingredients: ['123123', '34534'],
              _id: '453454',
              status: 'success',
              name: 'name',
              number: 5463,
              createdAt: '16.05.2022',
              updatedAt: '16.05.2022',
            },
          ],
          total: 1,
          totalToday: 1,
        })
      )
    ).toEqual({
      ...initialWebSocket,
      feedOrders: {
        ...initialWebSocket.feedOrders,
        list: [
          {
            ingredients: ['123123', '34534'],
            _id: '453454',
            status: 'success',
            name: 'name',
            number: 5463,
            createdAt: '16.05.2022',
            updatedAt: '16.05.2022',
          },
        ],
        total: 1,
        totalToday: 1,
      },
    });
  });

  it(`should return ${types.WS_GET_ALL_ORDERS} if failed request`, () => {
    expect(
      webSocketReducer(
        initialWebSocket,
        actions.wsGetAllOrders({
          success: false,
          orders: [],
          total: 0,
          totalToday: 0,
        })
      )
    ).toEqual(initialWebSocket);
  });

  it(`should return ${types.WS_GET_HISTORY_ORDERS} if success request`, () => {
    expect(
      webSocketReducer(
        initialWebSocket,
        actions.wsGetHistoryOrders({
          success: true,
          orders: [
            {
              ingredients: ['123123', '34534'],
              _id: '453454',
              status: 'success',
              name: 'name',
              number: 5463,
              createdAt: '16.05.2022',
              updatedAt: '16.05.2022',
            },
          ],
          total: 1,
          totalToday: 1,
        })
      )
    ).toEqual({
      ...initialWebSocket,
      historyOrders: {
        ...initialWebSocket.historyOrders,
        list: [
          {
            ingredients: ['123123', '34534'],
            _id: '453454',
            status: 'success',
            name: 'name',
            number: 5463,
            createdAt: '16.05.2022',
            updatedAt: '16.05.2022',
          },
        ],
        total: 1,
        totalToday: 1,
      },
    });
  });

  it(`should return ${types.WS_GET_HISTORY_ORDERS} if failed request`, () => {
    expect(
      webSocketReducer(
        initialWebSocket,
        actions.wsGetHistoryOrders({
          success: false,
          orders: [],
          total: 0,
          totalToday: 0,
        })
      )
    ).toEqual(initialWebSocket);
  });
});
