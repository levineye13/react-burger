import React from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.css';
import Form from '../../components/form/form';
import { PAGES } from '../../utils/constants';

const { profile } = PAGES;

function Profile() {
  return (
    <section>
      <nav>
        <ul>
          <li>
            <NavLink
              to={profile}
              className="text text_type_main-default text_color_inactive"
              activeClassName={styles.link}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              className="text text_type_main-default text_color_inactive"
              activeClassName={styles.link}
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              className="text text_type_main-default text_color_inactive"
              activeClassName={styles.link}
            >
              Выход
            </NavLink>
          </li>
        </ul>
      </nav>
      <Form name="profile">
        <Input type="text" name="name" placeholder="Имя" icon="EditIcon" />
        <Input type="email" name="email" placeholder="Логин" icon="EditIcon" />
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          icon="EditIcon"
        />
      </Form>
    </section>
  );
}

export default Profile;
