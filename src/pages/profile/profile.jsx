import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';
import Form from '../../components/form/form';
import { PAGES } from '../../utils/constants';

const { profile } = PAGES;

const setActiveLink = ({ isActive }) =>
  `${styles.link} text text_type_main-medium ${
    isActive ? styles.link_active : 'text_color_inactive'
  }`;

function Profile() {
  return (
    <section className={`${styles.section} mt-30`}>
      <div className={`${styles.menu} mr-15`}>
        <nav>
          <ul className={styles.list}>
            <li className={styles.item}>
              <NavLink to={profile} className={setActiveLink}>
                Профиль
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to="/" className={setActiveLink}>
                История заказов
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to="/" className={setActiveLink}>
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
      <Form name="profile">
        <Input type="text" name="name" placeholder="Имя" icon="EditIcon" />
        <Input type="email" name="email" placeholder="Логин" icon="EditIcon" />
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          icon="EditIcon"
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
