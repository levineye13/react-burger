export const API_BASE_URL: string = 'https://norma.nomoreparties.space/api';
export const ESC_KEY: 'Escape' = 'Escape';
export const AUTH_SCHEMA_TYPE: 'Bearer' = 'Bearer';

export const modalContainer: HTMLDivElement = document.getElementById(
  'modal'
) as HTMLDivElement;

export enum ApiEndpoints {
  Ingredients = '/ingredients',
  Orders = '/orders',
  RestorePassword = '/password-reset',
  ResetPassword = '/password-reset/reset',
  Login = '/auth/login',
  Register = '/auth/register',
  Logout = '/auth/logout',
  RefreshToken = '/auth/token',
  User = '/auth/user',
}

export enum Pages {
  Root = '/',
  Login = '/login',
  Register = '/register',
  ForgotPassword = '/forgot-password',
  ResetPassword = '/reset-password',
  Profile = '/profile',
  Orders = '/profile/orders',
  Ingredients = '/ingredients',
}

export enum HttpMethods {
  Head = 'HEAD',
  Get = 'GET',
  Post = 'POST',
  Patch = 'PATCH',
  Put = 'PUT',
  Delete = 'DELETE',
  Options = 'OPTIONS',
}

export enum Headers {
  Accept = 'application/json',
  'Content-Type' = 'application/json',
}

export enum TokenType {
  Access = 'accessToken',
  Refresh = 'refreshToken',
}

export enum TokenDuration {
  Access = 20,
  Refresh = 60 * 24 * 7,
}

export enum Tabs {
  One = 'one',
  Two = 'two',
  Three = 'three',
}

export enum IngredientType {
  Bun = 'bun',
  Sauce = 'sauce',
  Main = 'main',
}

export enum Forms {
  Login = 'login',
  Register = 'register',
  Profile = 'profile',
  ForgotPassword = 'forgotPassword',
  ResetPassword = 'resetPassword',
}

export enum Fields {
  Email = 'email',
  Name = 'name',
  Password = 'password',
  Code = 'code',
}
