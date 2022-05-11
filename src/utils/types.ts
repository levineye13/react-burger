import {
  WS_FEED_CONNECTION_START,
  WS_HISTORY_CONNECTION_START,
  WS_FEED_CONNECTION_CLOSED,
  WS_HISTORY_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_HISTORY_CONNECTION_ERROR,
  WS_FEED_CONNECTION_SUCCESS,
  WS_HISTORY_CONNECTION_SUCCESS,
  WS_GET_ALL_ORDERS,
  WS_GET_HISTORY_ORDERS,
} from './../services/action-types/web-socket';
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
  TWebSocket,
} from '../services/actions';
import { rootReducer } from '../services/reducers';

export type TAppActions =
  | TBurgerIngredients
  | TConstructorIngredients
  | TCurrentIngredient
  | TForm
  | TOrder
  | TUser
  | TWebSocket;

export type RootState = ReturnType<typeof rootReducer>;

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

export type TFormName =
  | 'login'
  | 'register'
  | 'resetPassword'
  | 'forgotPassword'
  | 'profile';

export type TOrderResponce = {
  ingredients: ReadonlyArray<string>;
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TWSResponce = {
  success: boolean;
  orders: ReadonlyArray<TOrderResponce>;
  total: number;
  totalToday: number;
};

export type TFilterIngredients = {
  price: number;
  filtered: IIngredient[];
};

export type TWsActions = {
  wsStart: typeof WS_FEED_CONNECTION_START | typeof WS_HISTORY_CONNECTION_START;
  wsClosed:
    | typeof WS_FEED_CONNECTION_CLOSED
    | typeof WS_HISTORY_CONNECTION_CLOSED;
  wsError: typeof WS_FEED_CONNECTION_ERROR | typeof WS_HISTORY_CONNECTION_ERROR;
  wsSuccess:
    | typeof WS_FEED_CONNECTION_SUCCESS
    | typeof WS_HISTORY_CONNECTION_SUCCESS;
  wsMessage: typeof WS_GET_ALL_ORDERS | typeof WS_GET_HISTORY_ORDERS;
};
