import { IApiArguments } from './../../utils/interfaces';
import { TAppThunk, TAppDispatch } from './../../utils/types';
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  REFRESH_TOKEN,
  RESTORE_PASSWORD,
  RESET_PASSWORD,
  GET_USER,
  UPDATE_USER,
  USER_REQUEST_SENT,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAILED,
  SET_AUTH,
  SET_UNAUTH,
} from '../action-types';

import { api } from '../../utils/api';
import Cookie from '../../utils/cookie';
import { TokenType } from '../../utils/constants';

// ======= Actions =======

export interface ISetAuth {
  readonly type: typeof SET_AUTH;
}

export interface ISetUnauth {
  readonly type: typeof SET_UNAUTH;
}

export interface ILogout {
  readonly type: typeof LOGOUT;
}

export interface IUserRequestSuccess {
  readonly type: typeof USER_REQUEST_SUCCESS;
}

export interface IUserRequestSent {
  readonly type: typeof USER_REQUEST_SENT;
}

export interface IUserRequestFailed {
  readonly type: typeof USER_REQUEST_FAILED;
}

export interface IRefreshToken {
  readonly type: typeof REFRESH_TOKEN;
}

export interface ILogin {
  readonly type: typeof LOGIN;
  readonly payload: IApiArguments;
}

export interface IRegister {
  readonly type: typeof REGISTER;
  readonly payload: IApiArguments;
}

export interface IGetUser {
  readonly type: typeof GET_USER;
  readonly payload: IApiArguments;
}

export interface IUpdateUser {
  readonly type: typeof UPDATE_USER;
  readonly payload: IApiArguments;
}

export interface IRestorePassword {
  readonly type: typeof RESTORE_PASSWORD;
}

export interface IResetPassword {
  readonly type: typeof RESET_PASSWORD;
}

export type TUser =
  | ISetAuth
  | ISetUnauth
  | ILogout
  | ILogin
  | IRegister
  | IUpdateUser
  | IUserRequestSuccess
  | IUserRequestSent
  | IUserRequestFailed
  | IRefreshToken
  | IRestorePassword
  | IResetPassword;

// ======= Action Creators =======

export const setAuth = (): ISetAuth => ({ type: SET_AUTH });

export const setUnauth = (): ISetUnauth => ({ type: SET_UNAUTH });

export const logout: TAppThunk = () => async (dispatch: TAppDispatch) => {
  dispatch({ type: USER_REQUEST_SENT });

  const data = await api.logout();

  if (data) {
    dispatch({ type: LOGOUT });
    dispatch({ type: USER_REQUEST_SUCCESS });
  } else {
    dispatch({ type: USER_REQUEST_FAILED });
  }
};

export const refreshToken: TAppThunk = () => async (dispatch: TAppDispatch) => {
  dispatch({ type: USER_REQUEST_SENT });

  const data = await api.refreshToken(Cookie.get(TokenType.Refresh) || '');

  if (data) {
    dispatch({ type: REFRESH_TOKEN });
    dispatch({ type: USER_REQUEST_SUCCESS });
    dispatch({ type: SET_AUTH });
  } else {
    dispatch({ type: USER_REQUEST_FAILED });
  }
};

export const login: TAppThunk =
  ({ email, password }) =>
  async (dispatch: TAppDispatch) => {
    dispatch({ type: USER_REQUEST_SENT });

    const user = await api.login({ email, password });

    if (user) {
      dispatch({ type: LOGIN, payload: user });
      dispatch({ type: USER_REQUEST_SUCCESS });
    } else {
      dispatch({ type: USER_REQUEST_FAILED });
    }
  };

export const register: TAppThunk =
  ({ email, password, name }) =>
  async (dispatch: TAppDispatch) => {
    dispatch({ type: USER_REQUEST_SENT });

    const user = await api.register({ email, password, name });

    if (user) {
      dispatch({ type: REGISTER, payload: user });
      dispatch({ type: USER_REQUEST_SUCCESS });
    } else {
      dispatch({ type: USER_REQUEST_FAILED });
    }
  };

export const getUser: TAppThunk = () => async (dispatch: TAppDispatch) => {
  dispatch({ type: USER_REQUEST_SENT });

  const user = await api.getUser();

  if (user === false) {
    const data = await api.refreshToken(Cookie.get(TokenType.Refresh) || '');

    if (!data) {
      dispatch({ type: USER_REQUEST_FAILED });
    } else {
      const user = await api.getUser();

      if (typeof user === 'object') {
        dispatch({ type: UPDATE_USER, payload: user });
        dispatch({ type: USER_REQUEST_SUCCESS });
      } else {
        dispatch({ type: USER_REQUEST_FAILED });
      }
    }
  } else if (typeof user === 'object') {
    dispatch({ type: UPDATE_USER, payload: user });
    dispatch({ type: USER_REQUEST_SUCCESS });
  }
};

export const updateUser: TAppThunk =
  ({ email, name, password }) =>
  async (dispatch: TAppDispatch) => {
    dispatch({ type: USER_REQUEST_SENT });

    const user = await api.updateUser({ email, name, password });

    if (user === false) {
      const data = await api.refreshToken(Cookie.get(TokenType.Refresh) || '');

      if (!data) {
        dispatch({ type: USER_REQUEST_FAILED });
      } else {
        const user = await api.updateUser({ email, name, password });

        if (typeof user === 'object') {
          dispatch({ type: UPDATE_USER, payload: user });
          dispatch({ type: USER_REQUEST_SUCCESS });
        } else {
          dispatch({ type: USER_REQUEST_FAILED });
        }
      }
    } else if (typeof user === 'object') {
      dispatch({ type: UPDATE_USER, payload: user });
      dispatch({ type: USER_REQUEST_SUCCESS });
    }
  };

export const restorePassword: TAppThunk =
  ({ email }) =>
  async (dispatch: TAppDispatch) => {
    dispatch({ type: USER_REQUEST_SENT });

    const data = await api.restorePassword({ email });

    if (data) {
      dispatch({ type: RESTORE_PASSWORD });
      dispatch({ type: USER_REQUEST_SUCCESS });
    } else {
      dispatch({ type: USER_REQUEST_FAILED });
    }
  };

export const resetPassword: TAppThunk =
  ({ password, token }) =>
  async (dispatch: TAppDispatch) => {
    dispatch({ type: USER_REQUEST_SENT });

    const data = await api.resetPassword({ password, token });

    if (data) {
      dispatch({ type: RESET_PASSWORD });
      dispatch({ type: USER_REQUEST_SUCCESS });
    } else {
      dispatch({ type: USER_REQUEST_FAILED });
    }
  };
