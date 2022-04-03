export const API_BASE_URL = 'https://norma.nomoreparties.space/api';

export const API_ENDPOINT = {
  ingredients: '/ingredients',
  orders: '/orders',
  restorePassword: '/password-reset',
  resetPassword: '/password-reset/reset',
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  refreshToken: '/auth/token',
  user: '/auth/user',
  ingredient: (id) => `/ingredients/${id}`,
};

export const PAGES = {
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

export const HTTP_METHOD = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
};

export const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const AUTH_SCHEMA_TYPE = 'Bearer';

export const TOKEN_TYPE = {
  access: 'accessToken',
  refresh: 'refreshToken',
};

export const TOKEN_DURATION = {
  access: 20,
  refresh: 60 * 24 * 7,
};

export const modalContainer = document.getElementById('modal');
export const ESC_CODE = 27;

export const TABS = {
  one: 'one',
  two: 'two',
  three: 'three',
};

export const INGREDIENT_TYPE = {
  bun: 'bun',
  sauce: 'sauce',
  main: 'main',
};
