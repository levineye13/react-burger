import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IIngredient } from './interfaces';
import {
  TBurgerIngredients,
  TConstructorIngredients,
  TCurrentIngredient,
  TForm,
  TOrder,
  TUser,
} from '../services/actions';
import { store } from '../services/store';

export type TAppActions =
  | TBurgerIngredients
  | TConstructorIngredients
  | TCurrentIngredient
  | TForm
  | TOrder
  | TUser;

export type RootState = ReturnType<typeof store.getState>;

export type TAppDispatch = Dispatch<TAppActions>;

export type TAppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, unknown, TAppActions>
>;

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

export type TIngredientType = 'bun' | 'sauce' | 'main';

export type TSortedIngredietns = {
  [key in TIngredientType]: IIngredient[];
};

export type TFormField = {
  email: string;
  password: string;
  name: string;
  token: string;
};
