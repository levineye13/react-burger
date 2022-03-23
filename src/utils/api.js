import {
  API_BASE_URL,
  API_ENDPOINT,
  HTTP_METHOD,
  HEADERS,
  AUTH_SCHEMA_TYPE,
  TOKEN_TYPE,
} from './constants';

import Cookie from './cookie';

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

class Api {
  constructor(baseUrl, { headers = {}, schemaType = '' }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._schemaType = schemaType;
  }

  async _getDataFromResponce(res) {
    if (!res.ok) {
      throw new Error(`${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    if (!data || !data.success) {
      throw new Error(`${data}`);
    }

    return data;
  }

  async restorePassword({ email }) {
    try {
      const res = await fetch(`${this._baseUrl}${restorePassword}`, {
        method: HTTP_METHOD.post,
        headers: this._headers,
        body: JSON.stringify({ email }),
      });

      return this._getDataFromResponce(res);
    } catch (e) {
      console.error(e);
    }
  }

  async resetPassword({ password, token }) {
    try {
      const res = await fetch(`${this._baseUrl}${resetPassword}`, {
        method: HTTP_METHOD.post,
        headers: this._headers,
        body: JSON.stringify({ password, token }),
      });

      return this._getDataFromResponce(res);
    } catch (e) {
      console.error(e);
    }
  }

  async register({ email, password, name }) {
    try {
      const res = await fetch(`${this._baseUrl}${register}`, {
        method: HTTP_METHOD.post,
        headers: this._headers,
        body: JSON.stringify({ email, password, name }),
      });

      const data = await this._getDataFromResponce(res);

      if (data.success) {
        Cookie.set(access, data[access]);
        Cookie.set(refresh, data[refresh]);
      }

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async login({ email, password }) {
    try {
      const res = await fetch(`${this._baseUrl}${login}`, {
        method: HTTP_METHOD.post,
        headers: this._headers,
        body: JSON.stringify({ email, password }),
      });

      const data = await this._getDataFromResponce(res);

      if (data.success) {
        Cookie.set(access, data[access]);
        Cookie.set(refresh, data[refresh]);
      }

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async refreshToken() {
    try {
      const res = await fetch(`${this._baseUrl}${refreshToken}`, {
        method: HTTP_METHOD.post,
        headers: this._headers,
        body: JSON.stringify({ token: Cookie.get('refreshToken') }),
      });

      const data = await this._getDataFromResponce(res);

      if (data.success) {
        Cookie.set(access, data[access]);
      }

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async logout() {
    try {
      const res = await fetch(`${this._baseUrl}${logout}`, {
        method: HTTP_METHOD.post,
        headers: this._headers,
        body: JSON.stringify({ token: Cookie.get('refreshToken') }),
      });

      const data = this._getDataFromResponce(res);

      if (data.success) {
        Cookie.delete(access);
        Cookie.delete(refresh);
      }

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getUser() {
    try {
      const res = await fetch(`${this._baseUrl}${user}`, {
        method: HTTP_METHOD.get,
        headers: {
          ...this._headers,
          authorization: `${this._schemaType} ${Cookie.get(access)}`,
        },
      });

      return this._getDataFromResponce(res);
    } catch (e) {
      console.error(e);
    }
  }

  async updateUser({ email, name, password }) {
    try {
      const res = await fetch(`${this._baseUrl}${user}`, {
        method: HTTP_METHOD.patch,
        headers: {
          ...this._headers,
          authorization: `${this._schemaType} ${Cookie.get(access)}`,
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });

      return this._getDataFromResponce(res);
    } catch (e) {
      console.error(e);
    }
  }
}

export const api = new Api(API_BASE_URL, {
  headers: HEADERS,
  schemaType: AUTH_SCHEMA_TYPE,
});
