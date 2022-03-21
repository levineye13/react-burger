import React from 'react';
import { Link } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';
import { PAGES } from '../../utils/constants';

const { profile } = PAGES;

function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.content}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <Link className={`${styles.link} pt-4 pr-5 pb-4 pl-5`} to="/">
                <BurgerIcon type="primary" />
                <span className="text text_type_main-default ml-2">
                  Конструктор
                </span>
              </Link>
            </li>
            <li className="ml-2">
              <Link className={`${styles.link} pt-4 pr-5 pb-4 pl-5`} to="/">
                <ListIcon type="secondary" />
                <span className="text text_type_main-default text_color_inactive ml-2">
                  Лента заказов
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        <Logo />
        <Link className={`${styles.link} ${styles.account}`} to={profile}>
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default text_color_inactive ml-2">
            Личный кабинет
          </span>
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;
