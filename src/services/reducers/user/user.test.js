import { userReducer, initialUser } from './user';
import * as types from '../../action-types/user';
import * as actions from '../../actions/user';

describe('user reducer', () => {
  it(`should return initial state`, () => {
    expect(userReducer(undefined, {})).toEqual(initialUser);
  });

  it(`should return ${types.SET_AUTH}`, () => {
    expect(userReducer(initialUser, actions.setAuth())).toEqual({
      ...initialUser,
      isAuth: true,
    });
  });

  it(`should return ${types.SET_UNAUTH}`, () => {
    expect(userReducer(initialUser, actions.setUnauth())).toEqual({
      ...initialUser,
      isAuth: false,
    });
  });

  it(`should return ${types.LOGOUT}`, () => {
    expect(userReducer(initialUser, actions.logout())).toEqual({
      ...initialUser,
      isAuth: false,
    });
  });

  it(`should return ${types.REGISTER}`, () => {
    expect(
      userReducer(initialUser, {
        type: types.REGISTER,
        payload: {
          email: 'email@email.ru',
          name: 'UserName',
        },
      })
    ).toEqual({
      ...initialUser,
      email: 'email@email.ru',
      name: 'UserName',
      isAuth: true,
    });
  });

  it(`should return ${types.LOGIN}`, () => {
    expect(
      userReducer(initialUser, {
        type: types.LOGIN,
        payload: {
          email: 'email@email.ru',
          name: 'UserName',
        },
      })
    ).toEqual({
      ...initialUser,
      email: 'email@email.ru',
      name: 'UserName',
      isAuth: true,
    });
  });

  it(`should return ${types.GET_USER}`, () => {
    expect(
      userReducer(initialUser, {
        type: types.GET_USER,
        payload: {
          email: 'email@email.ru',
          name: 'UserName',
        },
      })
    ).toEqual({
      ...initialUser,
      email: 'email@email.ru',
      name: 'UserName',
    });
  });

  it(`should return ${types.UPDATE_USER}`, () => {
    expect(
      userReducer(initialUser, {
        type: types.UPDATE_USER,
        payload: {
          email: 'email@email.ru',
          name: 'UserName',
        },
      })
    ).toEqual({
      ...initialUser,
      email: 'email@email.ru',
      name: 'UserName',
    });
  });

  it(`should return ${types.USER_REQUEST_SENT}`, () => {
    expect(userReducer(initialUser, { type: types.USER_REQUEST_SENT })).toEqual(
      {
        ...initialUser,
        request: true,
        failed: false,
      }
    );
  });

  it(`should return ${types.USER_REQUEST_SUCCESS}`, () => {
    expect(
      userReducer(initialUser, { type: types.USER_REQUEST_SUCCESS })
    ).toEqual({
      ...initialUser,
      request: false,
      failed: false,
    });
  });

  it(`should return ${types.USER_REQUEST_FAILED}`, () => {
    expect(
      userReducer(initialUser, { type: types.USER_REQUEST_FAILED })
    ).toEqual({
      ...initialUser,
      request: false,
      failed: true,
    });
  });
});
