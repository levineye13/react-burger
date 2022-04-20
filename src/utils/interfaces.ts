import { TResponceBody } from './types';

export interface IUser {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export interface IIngredient {
  readonly _id: string;
  readonly name: string;
  readonly image: string;
  readonly price: number;
  readonly type: string;
  readonly uuid?: string;
}

export interface ICookie {
  set(name: string, value: string, options?: {}): void;
  get(name: string): string | undefined;
  delete(name: string): void;
}

export interface IApiArguments {
  readonly name?: string;
  readonly email?: string;
  readonly password?: string;
  readonly token?: string;
}

export interface IApi {
  login(args: IApiArguments): Promise<IApiArguments | void>;
  register(args: IApiArguments): Promise<IApiArguments | void>;
  logout(): Promise<TResponceBody | void>;
  getUser(args: IApiArguments): Promise<IApiArguments | boolean | void>;
  updateUser(args: IApiArguments): Promise<IApiArguments | boolean | void>;
  restorePassword(args: IApiArguments): Promise<IApiArguments | void>;
  resetPassword(args: IApiArguments): Promise<IApiArguments | void>;
  refreshToken(token: string): Promise<IApiArguments | void>;
  getIngredients(): Promise<IIngredient[] | void>;
  makeOrder(
    ingredientId: Array<string | number>
  ): Promise<TResponceBody | void>;
}

export interface IOrder {
  number: number;
}
