import { IApi, IApiArguments } from './interfaces';
import { TResponceBody } from './types';
import Cookie from './cookie';
import { extractToken } from './utils';
import {
  API_BASE_URL,
  API_ENDPOINT,
  HTTP_METHOD,
  HEADERS,
  AUTH_SCHEMA_TYPE,
  TOKEN_TYPE,
  TOKEN_DURATION,
} from './constants';

const {
  restorePassword,
  resetPassword,
  register,
  login,
  logout,
  refreshToken,
  user,
} = API_ENDPOINT;

const { access, refresh } = TOKEN_TYPE;

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
      extractToken(data, access, AUTH_SCHEMA_TYPE);
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
        extractToken(data, access, AUTH_SCHEMA_TYPE);
      }

      return data;
    }
  }

  async restorePassword({
    email,
  }: IApiArguments): Promise<IApiArguments | void> {
    try {
      const res: Response = await fetch(`${this.baseUrl}${restorePassword}`, {
        method: HTTP_METHOD.post,
        headers: this.options.headers,
        body: JSON.stringify({ email }),
      });

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
      const res: Response = await fetch(`${this.baseUrl}${resetPassword}`, {
        method: HTTP_METHOD.post,
        headers: this.options.headers,
        body: JSON.stringify({ password, token }),
      });

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
      const res: Response = await fetch(`${this.baseUrl}${register}`, {
        method: HTTP_METHOD.post,
        headers: this.options.headers,
        body: JSON.stringify({ email, password, name }),
      });

      const data = await this._getDataFromResponce<'user', IApiArguments>(res);

      if (data.success) {
        Cookie.set(access, data.accessToken || '', {
          expires: TOKEN_DURATION.access,
        });
        Cookie.set(refresh, data.refreshToken || '', {
          expires: TOKEN_DURATION.refresh,
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
      const res: Response = await fetch(`${this.baseUrl}${login}`, {
        method: HTTP_METHOD.post,
        headers: this.options.headers,
        body: JSON.stringify({ email, password }),
      });

      const data = await this._getDataFromResponce<'user', IApiArguments>(res);

      if (data.success) {
        Cookie.set(access, data.accessToken || '', {
          expires: TOKEN_DURATION.access,
        });
        Cookie.set(refresh, data.refreshToken || '', {
          expires: TOKEN_DURATION.refresh,
        });
      }

      return data.user;
    } catch (e) {
      console.error(e);
    }
  }

  async refreshToken(token: string): Promise<IApiArguments | void> {
    try {
      const res: Response = await fetch(`${this.baseUrl}${refreshToken}`, {
        method: HTTP_METHOD.post,
        headers: this.options.headers,
        body: JSON.stringify({ token }),
      });

      const data = await this._getDataFromResponce<'token', string>(res);

      if (data.success) {
        Cookie.set(access, data.accessToken || '', {
          expires: TOKEN_DURATION.access,
        });
        Cookie.set(refresh, data.refreshToken || '', {
          expires: TOKEN_DURATION.refresh,
        });
      }

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async logout(): Promise<TResponceBody | void> {
    try {
      const res: Response = await fetch(`${this.baseUrl}${logout}`, {
        method: HTTP_METHOD.post,
        headers: this.options.headers,
        body: JSON.stringify({ token: Cookie.get(refresh) }),
      });

      const data = await this._getDataFromResponce(res);

      if (data.success) {
        Cookie.delete(access);
        Cookie.delete(refresh);
      }

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getUser(): Promise<IApiArguments | boolean | void> {
    try {
      const res: Response = await fetch(`${this.baseUrl}${user}`, {
        method: HTTP_METHOD.get,
        headers: {
          ...this.options.headers,
          authorization: `${this.options.schemaType} ${Cookie.get(access)}`,
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
      const res: Response = await fetch(`${this.baseUrl}${user}`, {
        method: HTTP_METHOD.patch,
        headers: {
          ...this.options.headers,
          authorization: `${this.options.schemaType} ${Cookie.get(access)}`,
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
}

export const api = new Api(API_BASE_URL, {
  headers: HEADERS,
  schemaType: AUTH_SCHEMA_TYPE,
});
