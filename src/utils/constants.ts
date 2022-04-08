import { THttpPath, TCommon, THttpMethods } from './types';

export const API_BASE_URL: string = 'https://norma.nomoreparties.space/api';

export const API_ENDPOINT: THttpPath = {
  ingredients: '/ingredients',
  orders: '/orders',
  restorePassword: '/password-reset',
  resetPassword: '/password-reset/reset',
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  refreshToken: '/auth/token',
  user: '/auth/user',
  ingredient: (id: string) => `/ingredients/${id}`,
};

export const PAGES: THttpPath = {
  root: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  orders: '/profile/orders',
  order: (id) => `/profile/orders/${id}`,
  ingredients: '/ingredients',
};

export const HTTP_METHOD: THttpMethods = {
  head: 'HEAD',
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  put: 'PUT',
  delete: 'DELETE',
  options: 'OPTIONS',
};

export const HEADERS: TCommon = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const AUTH_SCHEMA_TYPE: string = 'Bearer';

export const TOKEN_TYPE: {
  access: string;
  refresh: string;
} = {
  access: 'accessToken',
  refresh: 'refreshToken',
};

export const TOKEN_DURATION: { access: number; refresh: number } = {
  access: 20,
  refresh: 60 * 24 * 7,
};

export const modalContainer: HTMLDivElement = document.getElementById(
  'modal'
) as HTMLDivElement;

export const ESC_CODE: number = 27;

export const TABS: TCommon = {
  one: 'one',
  two: 'two',
  three: 'three',
};

export const INGREDIENT_TYPE: TCommon = {
  bun: 'bun',
  sauce: 'sauce',
  main: 'main',
};
