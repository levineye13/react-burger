import { IIngredient } from './interfaces';

export type THttpPath = {
  [key: string]: string;
};

export type THttpMethod =
  | 'head'
  | 'get'
  | 'post'
  | 'patch'
  | 'put'
  | 'delete'
  | 'options';

export type THttpMethods = {
  [method in THttpMethod]: string;
};

export type TResponceBody<
  TKey extends string = '',
  TData extends {} | string = {}
> = {
  [key in TKey]?: TData;
} & {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
};

export type TSortedIngredietns = {
  [arrName: string]: IIngredient[];
};
