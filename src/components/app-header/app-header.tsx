import React, { FC, ReactElement } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';
import { Pages } from '../../utils/constants';

const AppHeader: FC = (): ReactElement => {
  const { pathname } = useLocation();

  const setIconClassName = (
    path: string,
    currentPath: string
  ): 'primary' | 'secondary' => {
    return currentPath === path ? 'primary' : 'secondary';
  };

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.content}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <NavLink
                className={`${styles.link} text text_type_main-default text_color_inactive pt-4 pr-5 pb-4 pl-5`}
                activeClassName={styles.link_active}
                to={Pages.Root}
                exact
              >
                <BurgerIcon type={setIconClassName(Pages.Root, pathname)} />
                <span className="ml-2">Конструктор</span>
              </NavLink>
            </li>
            <li className="ml-2">
              <NavLink
                className={`${styles.link} text text_type_main-default text_color_inactive pt-4 pr-5 pb-4 pl-5`}
                activeClassName={styles.link_active}
                to={Pages.Orders}
              >
                <ListIcon type={setIconClassName(Pages.Orders, pathname)} />
                <span className="ml-2">Лента заказов</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Logo />
        <NavLink
          className={`${styles.link} ${styles.account} text text_type_main-default text_color_inactive`}
          activeClassName={styles.link_active}
          to={Pages.Profile}
          exact
        >
          <ProfileIcon type={setIconClassName(Pages.Profile, pathname)} />
          <span className="ml-2">Личный кабинет</span>
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;
