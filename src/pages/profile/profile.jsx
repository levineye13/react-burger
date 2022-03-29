import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';
import Form from '../../components/form/form';
import { useForm } from '../../hooks/useForm';
import { PAGES } from '../../utils/constants';
import { logout, updateUser } from '../../services/actions';

const { profile } = PAGES;

function Profile() {
  const { handleChange, handleSubmit, values } = useForm('profile', updateUser);

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
              >
                Профиль
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink
                to="/"
                className={`${styles.link} text text_type_main-medium text_color_inactive`}
                activeClassName={styles.link_active}
              >
                История заказов
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink
                to="/"
                className={`${styles.link} text text_type_main-medium text_color_inactive`}
                activeClassName={styles.link_active}
                onClick={logout}
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
        <div className={styles.buttons}>
          <Button type="secondary" size="medium" htmlType="button">
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
