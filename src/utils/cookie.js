class Cookie {
  static cookie = document.cookie;

  static set(name, value, options = {}) {
    let expires = options.expires;

    if (typeof exp === 'number') {
      const date = new Date();
      date.setTime(date.getTime() + expires * 1000);
      expires = date;
      options.expires = expires.toUTCString();
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
      value
    )}`;

    for (const key in options) {
      updatedCookie += `; ${key}`;

      const value = options[key];

      if (value !== true) {
        updatedCookie += `=${value}`;
      }
    }

    Cookie.cookie = updatedCookie;
  }

  static get(name) {
    const cookies = Cookie.cookie.split(';');

    for (let index = 0; index < cookies.length; index++) {
      const [key, value] = cookies[index].split('=');

      if (name === decodeURIComponent(key)) {
        return decodeURIComponent(value);
      }
    }

    return undefined;
  }

  static delete(name) {
    Cookie.set(name, '', { expires: -1 });
  }
}

export default Cookie;
