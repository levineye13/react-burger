import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './profile-menu.module.css';
import { Pages } from '../../utils/constants';
import { useDispatch } from '../../hooks';
import { logout } from '../../services/actions';

const ProfileMenu: FC = (): ReactElement => {
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(logout());
  };

  return (
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
  );
};

export default ProfileMenu;
