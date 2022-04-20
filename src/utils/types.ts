import { IIngredient } from './interfaces';

export type THttpMethod =
  | 'head'
  | 'get'
  | 'post'
  | 'patch'
  | 'put'
  | 'delete'
  | 'options';

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
  data?: IIngredient[];
  name?: string;
};

export type TSortedIngredietns = {
  [arrName: string]: IIngredient[];
};

export type TFormField = {
  email: string;
  password: string;
  name: string;
  token: string;
};
