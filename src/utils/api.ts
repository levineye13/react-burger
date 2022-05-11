import { IApi, IApiArguments, IIngredient, IOrder } from './interfaces';
import { TResponceBody } from './types';
import Cookie from './cookie';
import { extractToken } from './utils';
import {
  API_BASE_URL,
  ApiEndpoints,
  HttpMethods,
  Headers,
  AUTH_SCHEMA_TYPE,
  TokenType,
  TokenDuration,
} from './constants';

class Api implements IApi {
  public constructor(
    private readonly baseUrl: string,
    private readonly options: { headers?: {}; schemaType?: string } = {}
  ) {}

  async _getDataFromResponce<K extends string = '', D extends {} | string = {}>(
    res: Response
  ): Promise<TResponceBody<K, D> | never> {
    if (!res.ok) {
      throw new Error(`${res.status} - ${res.statusText}`);
    }

    const data: TResponceBody<K, D> = await res.json();

    if (!data || !data.success) {
      throw new Error(`${data}`);
    }

    if (data.accessToken) {
      extractToken(data, TokenType.Access, AUTH_SCHEMA_TYPE);
    }

    return data;
  }

  async _checkResponce<K extends string = '', D extends {} | string = {}>(
    res: Response
  ): Promise<TResponceBody<K, D> | boolean | never> {
    const data: TResponceBody<K, D> = await res.json();

    if (!res.ok) {
      if (data.success === false) {
        return false;
      }

      throw new Error(`${res.status} - ${res.statusText}`);
    } else {
      if (data.accessToken) {
        extractToken(data, TokenType.Access, AUTH_SCHEMA_TYPE);
      }

      return data;
    }
  }

  async restorePassword({
    email,
  }: IApiArguments): Promise<IApiArguments | void> {
    try {
      const res: Response = await fetch(
        `${this.baseUrl}${ApiEndpoints.RestorePassword}`,
        {
          method: HttpMethods.Post,
          headers: this.options.headers,
          body: JSON.stringify({ email }),
        }
      );

      return this._getDataFromResponce(res);
    } catch (e) {
      console.error(e);
    }
  }

  async resetPassword({
    password,
    token,
  }: IApiArguments): Promise<IApiArguments | void> {
    try {
      const res: Response = await fetch(
        `${this.baseUrl}${ApiEndpoints.ResetPassword}`,
        {
          method: HttpMethods.Post,
          headers: this.options.headers,
          body: JSON.stringify({ password, token }),
        }
      );

      return this._getDataFromResponce<'token', string>(res);
    } catch (e) {
      console.error(e);
    }
  }

  async register({
    email,
    password,
    name,
  }: IApiArguments): Promise<IApiArguments | void> {
    try {
      const res: Response = await fetch(
        `${this.baseUrl}${ApiEndpoints.Register}`,
        {
          method: HttpMethods.Post,
          headers: this.options.headers,
          body: JSON.stringify({ email, password, name }),
        }
      );

      const data = await this._getDataFromResponce<'user', IApiArguments>(res);

      if (data.success) {
        Cookie.set(TokenType.Access, data.accessToken || '', {
          expires: TokenDuration.Access,
        });
        Cookie.set(TokenType.Refresh, data.refreshToken || '', {
          expires: TokenDuration.Refresh,
        });
      }

      return data.user;
    } catch (e) {
      console.error(e);
    }
  }

  async login({
    email,
    password,
  }: IApiArguments): Promise<IApiArguments | void> {
    try {
      const res: Response = await fetch(
        `${this.baseUrl}${ApiEndpoints.Login}`,
        {
          method: HttpMethods.Post,
          headers: this.options.headers,
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await this._getDataFromResponce<'user', IApiArguments>(res);

      if (data.success) {
        Cookie.set(TokenType.Access, data.accessToken || '', {
          expires: TokenDuration.Access,
        });
        Cookie.set(TokenType.Refresh, data.refreshToken || '', {
          expires: TokenDuration.Refresh,
        });
      }

      return data.user;
    } catch (e) {
      console.error(e);
    }
  }

  async refreshToken(token: string): Promise<IApiArguments | void> {
    try {
      const res: Response = await fetch(
        `${this.baseUrl}${ApiEndpoints.RefreshToken}`,
        {
          method: HttpMethods.Post,
          headers: this.options.headers,
          body: JSON.stringify({ token }),
        }
      );

      const data = await this._getDataFromResponce<'token', string>(res);

      if (data.success) {
        Cookie.set(TokenType.Access, data.accessToken || '', {
          expires: TokenDuration.Access,
        });
        Cookie.set(TokenType.Refresh, data.refreshToken || '', {
          expires: TokenDuration.Refresh,
        });
      }

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async logout(): Promise<TResponceBody | void> {
    try {
      const res: Response = await fetch(
        `${this.baseUrl}${ApiEndpoints.Logout}`,
        {
          method: HttpMethods.Post,
          headers: this.options.headers,
          body: JSON.stringify({ token: Cookie.get(TokenType.Refresh) }),
        }
      );

      const data = await this._getDataFromResponce(res);

      if (data.success) {
        Cookie.delete(TokenType.Access);
        Cookie.delete(TokenType.Refresh);
      }

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getUser(): Promise<IApiArguments | boolean | void> {
    try {
      const res: Response = await fetch(`${this.baseUrl}${ApiEndpoints.User}`, {
        method: HttpMethods.Get,
        headers: {
          ...this.options.headers,
          authorization: `${this.options.schemaType} ${Cookie.get(
            TokenType.Access
          )}`,
        },
      });

      const data = await this._checkResponce<'user', IApiArguments>(res);

      if (data === false) {
        return false;
      }

      if (typeof data === 'object' && data.user) {
        return data.user;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async updateUser({
    email,
    name,
    password,
  }: IApiArguments): Promise<IApiArguments | boolean | void> {
    try {
      const res: Response = await fetch(`${this.baseUrl}${ApiEndpoints.User}`, {
        method: HttpMethods.Patch,
        headers: {
          ...this.options.headers,
          authorization: `${this.options.schemaType} ${Cookie.get(
            TokenType.Access
          )}`,
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });

      const data = await this._checkResponce<'user', IApiArguments>(res);

      if (data === false) {
        return false;
      }

      if (typeof data === 'object' && data.user) {
        return data.user;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getIngredients(): Promise<IIngredient[] | void> {
    try {
      const res: Response = await fetch(
        `${this.baseUrl}${ApiEndpoints.Ingredients}`,
        {
          method: HttpMethods.Get,
          headers: Headers,
        }
      );

      const { data } = await this._getDataFromResponce(res);

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async makeOrder(
    ingredientsId: Array<string | number>
  ): Promise<TResponceBody<'order', IOrder> | void> {
    try {
      const res: Response = await fetch(
        `${this.baseUrl}${ApiEndpoints.Orders}`,
        {
          method: HttpMethods.Post,
          headers: {
            ...this.options.headers,
            authorization: `${this.options.schemaType} ${Cookie.get(
              TokenType.Access
            )}`,
          },
          body: JSON.stringify({
            ingredients: ingredientsId,
          }),
        }
      );

      return this._getDataFromResponce<'order', IOrder>(res);
    } catch (e) {
      console.error(e);
    }
  }
}

export const api = new Api(API_BASE_URL, {
  headers: Headers,
  schemaType: AUTH_SCHEMA_TYPE,
});
