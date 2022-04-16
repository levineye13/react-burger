import { ICookie } from './interfaces';

const Cookie: ICookie = class {
  public static set(
    name: string,
    value: string,
    options: { [key: string]: string | number | Date } = {}
  ): void {
    let expires = options.expires;

    if (typeof expires === 'number') {
      const date: Date = new Date();
      date.setTime(date.getTime() + expires * 60 * 1000);
      expires = date;
      options.expires = expires?.toUTCString();
    }

    let updatedCookie: string = `${encodeURIComponent(
      name
    )}=${encodeURIComponent(value)}`;

    for (const key in options) {
      updatedCookie += `; ${key}=${options[key]}`;
    }

    document.cookie = updatedCookie;
  }

  public static get(name: string): string | undefined {
    const cookies = document.cookie.split(';');

    for (let index = 0; index < cookies.length; index++) {
      const [key, value] = cookies[index].trim().split('=');

      if (name === decodeURIComponent(key)) {
        return decodeURIComponent(value);
      }
    }

    return undefined;
  }

  public static delete(name: string): void {
    Cookie.set(name, '', { expires: -1 });
  }
};

export default Cookie;
