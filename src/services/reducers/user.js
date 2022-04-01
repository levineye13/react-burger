import {
  LOGOUT,
  LOGIN,
  REGISTER,
  GET_USER,
  UPDATE_USER,
  REFRESH_TOKEN,
  RESTORE_PASSWORD,
  RESET_PASSWORD,
  USER_REQUEST_SENT,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAILED,
  SET_AUTH,
} from '../action-types';

const initialUser = {
  isAuth: false,
  email: '',
  name: '',
  request: false,
  failed: false,
};

export const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, isAuth: true };

    case LOGOUT:
      return { ...state, isAuth: false };

    case REGISTER:
    case LOGIN:
      return { ...state, ...action.payload, isAuth: true };

    case GET_USER:
    case UPDATE_USER:
      return { ...state, ...action.payload };

    case REFRESH_TOKEN:
    case RESTORE_PASSWORD:
    case RESET_PASSWORD:
      return state;

    case USER_REQUEST_SENT:
      return { ...state, request: true, failed: false };

    case USER_REQUEST_SUCCESS:
      return { ...state, request: false, failed: false };

    case USER_REQUEST_FAILED:
      return { ...state, request: false, failed: true };

    default:
      return state;
  }
};
