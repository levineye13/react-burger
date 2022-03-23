import {
  LOGOUT,
  LOGIN,
  REGISTER,
  GET_USER,
  UPDATE_USER,
  REFRESH_TOKEN,
  RESTORE_PASSWORD,
  RESET_PASSWORD,
} from '../action-types';

const initialUser = {
  isAuth: false,
  email: '',
  name: '',
};

export const userReducer = (state = initialUser, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};
