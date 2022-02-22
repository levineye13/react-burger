/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import styles from './app-header.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends Component {
  render() {
    return (
      <header className={`${styles.header} pt-4 pb-4`}>
        <div className={styles.content}>
          <nav className={styles.nav}>
            <ul className={styles.list}>
              <li>
                <a
                  className={`${styles.link} pt-4 pr-5 pb-4 pl-5`}
                  href="#"
                  target="_self"
                >
                  <BurgerIcon type="primary" />
                  <span className="text text_type_main-default ml-2">
                    Конструктор
                  </span>
                </a>
              </li>
              <li className="ml-2">
                <a
                  className={`${styles.link} pt-4 pr-5 pb-4 pl-5`}
                  href="#"
                  target="_self"
                >
                  <ListIcon type="secondary" />
                  <span className="text text_type_main-default text_color_inactive ml-2">
                    Лента заказов
                  </span>
                </a>
              </li>
            </ul>
          </nav>
          <Logo />
          <a
            className={`${styles.link} ${styles.account}`}
            href="#"
            target="_self"
          >
            <ProfileIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2">
              Личный кабинет
            </span>
          </a>
        </div>
      </header>
    );
  }
}

export default AppHeader;
