import React, { FC, ReactElement, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';
import Form from '../../components/form/form';
import { useForm, useDispatch, useSelector } from '../../hooks';
import { Pages, Forms, Fields } from '../../utils/constants';
import {
  getUser,
  logout,
  setFieldValue,
  updateUser,
} from '../../services/actions';

type TFields = Fields.Name | Fields.Email | Fields.Password;

const Profile: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { name, email } = useSelector((state) => state.user);

  const { values, handleChange, handleSubmit, setInitialValues } =
    useForm<TFields>(Forms.Profile, updateUser, {
      initialValues: {
        name,
        email,
        password: '',
      },
      callback: () =>
        dispatch(
          setFieldValue({
            formName: Forms.Profile,
            field: Fields.Password,
            value: '',
          })
        ),
    });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    setInitialValues();
  }, [name, email]);

  const handleLogout = (): void => {
    dispatch(logout());
  };

  const isInputsChanged = (): boolean => {
    if (
      (name !== values.name && values.name !== undefined) ||
      (email !== values.email && values.email !== undefined) ||
      values.password
    ) {
      return true;
    }

    return false;
  };

  return (
    <section className={`${styles.section} mt-30`}>
      <div className={`${styles.menu} mr-15`}>
        <nav>
          <ul className={styles.list}>
            <li className={styles.item}>
              <NavLink
                to={Pages.Profile}
                className={`${styles.link} text text_type_main-medium text_color_inactive`}
                activeClassName={styles.link_active}
                exact
              >
                Профиль
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink
                to={Pages.Orders}
                className={`${styles.link} text text_type_main-medium text_color_inactive`}
                activeClassName={styles.link_active}
              >
                История заказов
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink
                to={Pages.Login}
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
      <Form name={Forms.Profile} onSubmit={handleSubmit}>
        <Input
          type="text"
          name={Fields.Name}
          placeholder="Имя"
          icon="EditIcon"
          onChange={handleChange}
          value={values.name || ''}
        />
        <Input
          type={Fields.Email}
          name={Fields.Email}
          placeholder="Логин"
          icon="EditIcon"
          onChange={handleChange}
          value={values.email || ''}
        />
        <Input
          type={Fields.Password}
          name={Fields.Password}
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
};

export default Profile;
