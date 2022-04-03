import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';
import { PAGES } from '../../utils/constants';

const { root, profile, orders } = PAGES;

function AppHeader() {
  const { pathname } = useLocation();

  function setIconClassName(path, currentPath) {
    return currentPath === path ? 'primary' : 'secondary';
  }

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.content}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <NavLink
                className={`${styles.link} text text_type_main-default text_color_inactive pt-4 pr-5 pb-4 pl-5`}
                activeClassName={styles.link_active}
                to={root}
                exact
              >
                <BurgerIcon type={setIconClassName(root, pathname)} />
                <span className="ml-2">Конструктор</span>
              </NavLink>
            </li>
            <li className="ml-2">
              <NavLink
                className={`${styles.link} text text_type_main-default text_color_inactive pt-4 pr-5 pb-4 pl-5`}
                activeClassName={styles.link_active}
                to={orders}
              >
                <ListIcon type={setIconClassName(orders, pathname)} />
                <span className="ml-2">Лента заказов</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Logo />
        <NavLink
          className={`${styles.link} ${styles.account} text text_type_main-default text_color_inactive`}
          activeClassName={styles.link_active}
          to={profile}
          exact
        >
          <ProfileIcon type={setIconClassName(profile, pathname)} />
          <span className="ml-2">Личный кабинет</span>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
