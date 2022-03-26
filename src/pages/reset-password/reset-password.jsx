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

const { root, login, forgotPassword } = PAGES;

function ResetPassword() {
  const { isAuth } = useSelector((state) => state.user);
  const { state } = useLocation();

  if (isAuth || state?.from.pathname !== forgotPassword) {
    return <Redirect to={state?.from || root} />;
  }

  return (
    <AuthenticationSection title="Восстановление пароля">
      <Form name="resetPassword">
        <Input
          type="password"
          name="password"
          placeholder="Введите новый пароль"
          icon="ShowIcon"
        />
        <Input type="text" name="code" placeholder="Введите код из письма" />
        <Button type="primary" htmlType="submit" size="medium">
          Сохранить
        </Button>
      </Form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?&ensp;<Link to={login}>Войти</Link>
      </p>
    </AuthenticationSection>
  );
}

export default ResetPassword;
