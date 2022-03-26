import React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import AuthenticationSection from '../../components/authentication-section/authentication-section';
import Form from '../../components/form/form';
import { PAGES } from '../../utils/constants';

function Register() {
  const { isAuth } = useSelector((state) => state.user);
  const { state } = useLocation();

  if (isAuth) {
    return <Redirect to={state?.from || PAGES.root} />;
  }

  return (
    <AuthenticationSection title="Регистрация">
      <Form name="register">
        <Input type="text" name="name" placeholder="Имя" />
        <Input type="email" name="email" placeholder="E-mail" />
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          icon="ShowIcon"
        />
        <Button type="primary" htmlType="submit" size="medium">
          Зарегистрироваться
        </Button>
      </Form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?&ensp;<Link to={PAGES.login}>Войти</Link>
      </p>
    </AuthenticationSection>
  );
}

export default Register;
