import {
  LOGIN,
  LOGOUT,
  REGISTER,
  REFRESH_TOKEN,
  RESTORE_PASSWORD,
  RESET_PASSWORD,
  GET_USER,
  UPDATE_USER,
} from '../action-types';

import { api } from '../../utils/api';

export const logout = () => async (dispatch) => {
  await api.logout();
  dispatch({ type: LOGOUT });
};

export const refreshToken = () => async (dispatch) => {
  await api.refreshToken();
  dispatch({ type: REFRESH_TOKEN });
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const user = await api.login({ email, password });
    dispatch({ type: LOGIN, payload: user });
  };

export const register =
  ({ email, password, name }) =>
  async (dispatch) => {
    const user = await api.register({ email, password, name });
    dispatch({ type: REGISTER, payload: user });
  };

export const getUser = () => async (dispatch) => {
  const user = await api.getUser();
  dispatch({ type: GET_USER, payload: user });
};

export const updateUser =
  ({ email, name, password }) =>
  async (dispatch) => {
    const user = await api.updateUser({ email, name, password });
    dispatch({ type: UPDATE_USER, payload: user });
  };

export const restorePassword =
  ({ email }) =>
  async (dispatch) => {
    await api.restorePassword({ email });
    dispatch({ type: RESTORE_PASSWORD });
  };

export const resetPassword =
  ({ password, token }) =>
  async (dispatch) => {
    await api.resetPassword({ password, token });
    dispatch({ type: RESET_PASSWORD });
  };
