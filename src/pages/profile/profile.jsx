import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';
import Form from '../../components/form/form';
import { useForm } from '../../hooks/useForm';
import Cookie from '../../utils/cookie';
import { PAGES, TOKEN_TYPE } from '../../utils/constants';
import {
  getUser,
  logout,
  setFieldValue,
  updateUser,
} from '../../services/actions';

const { profile, orders, login } = PAGES;
const { access } = TOKEN_TYPE;

function Profile() {
  const dispatch = useDispatch();
  const { name, email } = useSelector((state) => state.user);
  const { values, handleChange, handleSubmit, setInitialValues } = useForm(
    'profile',
    updateUser,
    {
      initialValues: {
        name,
        email,
        password: '',
      },
      callback: () =>
        dispatch(
          setFieldValue({ formName: 'profile', field: 'password', value: '' })
        ),
    }
  );

  useEffect(() => {
    const token = Cookie.get(access);

    if (token) {
      dispatch(getUser());
    }
  }, [dispatch]);

  useEffect(() => {
    setInitialValues();
  }, [name, email]);

  function handleLogout() {
    dispatch(logout());
  }

  function isInputsChanged() {
    if (
      (name !== values.name && values.name !== undefined) ||
      (email !== values.email && values.email !== undefined) ||
      values.password
    ) {
      return true;
    }

    return false;
  }

  return (
    <section className={`${styles.section} mt-30`}>
      <div className={`${styles.menu} mr-15`}>
        <nav>
          <ul className={styles.list}>
            <li className={styles.item}>
              <NavLink
                to={profile}
                className={`${styles.link} text text_type_main-medium text_color_inactive`}
                activeClassName={styles.link_active}
                exact
              >
                Профиль
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink
                to={orders}
                className={`${styles.link} text text_type_main-medium text_color_inactive`}
                activeClassName={styles.link_active}
              >
                История заказов
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink
                to={login}
                className={`${styles.link} text text_type_main-medium text_color_inactive`}
                activeClassName={styles.link_active}
                onClick={handleLogout}
              >
                Выход
              </NavLink>
            </li>
          </ul>
        </nav>
        <p
          className={`${styles.paragraph} text text_type_main-default text_color_inactive mt-20`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Form name="profile" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Имя"
          icon="EditIcon"
          onChange={handleChange}
          value={values.name || ''}
        />
        <Input
          type="email"
          name="email"
          placeholder="Логин"
          icon="EditIcon"
          onChange={handleChange}
          value={values.email || ''}
        />
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          icon="EditIcon"
          onChange={handleChange}
          value={values.password || ''}
        />
        <div
          className={`${styles.buttons} ${
            isInputsChanged() ? styles.buttons_visible : ''
          }`}
        >
          <Button
            type="secondary"
            size="medium"
            htmlType="button"
            onClick={setInitialValues}
          >
            Отмена
          </Button>
          <Button type="primary" size="medium" htmlType="submit">
            Сохранить
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default Profile;
