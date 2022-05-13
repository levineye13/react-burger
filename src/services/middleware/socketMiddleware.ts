import { TokenType } from './../../utils/constants';
import { Middleware, MiddlewareAPI } from 'redux';
import Cookie from '../../utils/cookie';

import {
  RootState,
  TAppDispatch,
  TAppActions,
  TWsActions,
} from './../../utils/types';

export const socketMiddleware: (
  url: string,
  actions: TWsActions,
  options?: { withToken: boolean }
) => Middleware<{}, RootState, TAppDispatch> =
  (
    url: string,
    actions: TWsActions,
    options?: { withToken: boolean }
  ): Middleware<{}, RootState, TAppDispatch> =>
  ({ dispatch }: MiddlewareAPI<TAppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: TAppDispatch) => (action: TAppActions) => {
      const { type } = action;
      const { wsStart, wsSuccess, wsClosed, wsError, wsMessage } = actions;
      const token: string | undefined = Cookie.get(TokenType.Access);

      if (type === wsStart) {
        socket = new WebSocket(
          options?.withToken ? `${url}?token=${token}` : url
        );
      }

      if (socket) {
        socket.onopen = (e: Event) => {
          dispatch({ type: wsSuccess });
        };

        socket.onmessage = (e: MessageEvent) => {
          try {
            const data = JSON.parse(e.data);
            dispatch({ type: wsMessage, payload: data });
          } catch (err) {
            console.error(err);
          }
        };

        socket.onclose = (e: CloseEvent) => {
          dispatch({ type: wsClosed });

          if (e.wasClean) {
            console.log(`Соединение закрыто корректно - ${e.code}`);
            console.log(`Причина закрытия - ${e.reason}`);
          } else {
            console.error(`Соединение закрыто с кодом - ${e.code}`);
          }
        };

        socket.onerror = (e: Event) => {
          dispatch({ type: wsError });
          console.error(`Ошибка ${e}`);
        };
      }

      return next(action);
    };
  };
