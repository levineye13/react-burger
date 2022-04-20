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

export const setAuth = () => ({ type: SET_AUTH });

export const setUnauth = () => ({ type: SET_UNAUTH });

export const logout = () => async (dispatch) => {
  dispatch({ type: USER_REQUEST_SENT });

  const data = await api.logout();

  if (data) {
    dispatch({ type: LOGOUT });
    dispatch({ type: USER_REQUEST_SUCCESS });
  } else {
    dispatch({ type: USER_REQUEST_FAILED });
  }
};

export const refreshToken = () => async (dispatch) => {
  dispatch({ type: USER_REQUEST_SENT });

  const data = await api.refreshToken(Cookie.get(TokenType.Refresh));

  if (data) {
    dispatch({ type: REFRESH_TOKEN });
    dispatch({ type: USER_REQUEST_SUCCESS });
    dispatch({ type: SET_AUTH });
  } else {
    dispatch({ type: USER_REQUEST_FAILED });
  }
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch({ type: USER_REQUEST_SENT });

    const user = await api.login({ email, password });

    if (user) {
      dispatch({ type: LOGIN, payload: user });
      dispatch({ type: USER_REQUEST_SUCCESS });
    } else {
      dispatch({ type: USER_REQUEST_FAILED });
    }
  };

export const register =
  ({ email, password, name }) =>
  async (dispatch) => {
    dispatch({ type: USER_REQUEST_SENT });

    const user = await api.register({ email, password, name });

    if (user) {
      dispatch({ type: REGISTER, payload: user });
      dispatch({ type: USER_REQUEST_SUCCESS });
    } else {
      dispatch({ type: USER_REQUEST_FAILED });
    }
  };

export const getUser = () => async (dispatch) => {
  dispatch({ type: USER_REQUEST_SENT });

  const user = await api.getUser();

  if (user === false) {
    const data = await api.refreshToken(Cookie.get(TokenType.Refresh));

    if (!data) {
      dispatch({ type: USER_REQUEST_FAILED });
    } else {
      const user = await api.getUser();

      if (user) {
        dispatch({ type: UPDATE_USER, payload: user });
        dispatch({ type: USER_REQUEST_SUCCESS });
      } else {
        dispatch({ type: USER_REQUEST_FAILED });
      }
    }
  } else {
    dispatch({ type: UPDATE_USER, payload: user });
    dispatch({ type: USER_REQUEST_SUCCESS });
  }
};

export const updateUser =
  ({ email, name, password }) =>
  async (dispatch) => {
    dispatch({ type: USER_REQUEST_SENT });

    const user = await api.updateUser({ email, name, password });

    if (user === false) {
      const data = await api.refreshToken(Cookie.get(TokenType.Refresh));

      if (!data) {
        dispatch({ type: USER_REQUEST_FAILED });
      } else {
        const user = await api.updateUser({ email, name, password });

        if (user) {
          dispatch({ type: UPDATE_USER, payload: user });
          dispatch({ type: USER_REQUEST_SUCCESS });
        } else {
          dispatch({ type: USER_REQUEST_FAILED });
        }
      }
    } else {
      dispatch({ type: UPDATE_USER, payload: user });
      dispatch({ type: USER_REQUEST_SUCCESS });
    }
  };

export const restorePassword =
  ({ email }) =>
  async (dispatch) => {
    dispatch({ type: USER_REQUEST_SENT });

    const data = await api.restorePassword({ email });

    if (data) {
      dispatch({ type: RESTORE_PASSWORD });
      dispatch({ type: USER_REQUEST_SUCCESS });
    } else {
      dispatch({ type: USER_REQUEST_FAILED });
    }
  };

export const resetPassword =
  ({ password, token }) =>
  async (dispatch) => {
    dispatch({ type: USER_REQUEST_SENT });

    const data = await api.resetPassword({ password, token });

    if (data) {
      dispatch({ type: RESET_PASSWORD });
      dispatch({ type: USER_REQUEST_SUCCESS });
    } else {
      dispatch({ type: USER_REQUEST_FAILED });
    }
  };
