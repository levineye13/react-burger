import React from 'react';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import AuthenticationSection from '../../components/authentication-section/authentication-section';
import Form from '../../components/form/form';
import { PAGES } from '../../utils/constants';

const { root, login, resetPassword } = PAGES;

function ForgotPassword() {
  const { isAuth } = useSelector((state) => state.user);
  const { location, replace } = useHistory();

  if (isAuth) {
    return <Redirect to={location.state?.from || root} />;
  }

  function handleClick(e) {
    e.preventDefault();

    replace({ pathname: resetPassword, state: { from: location } });
  }

  return (
    <AuthenticationSection title="Восстановление пароля">
      <Form name="forgotPassword">
        <Input type="email" name="email" placeholder="Укажите e-mail" />
        <Button
          type="primary"
          htmlType="submit"
          size="medium"
          onClick={handleClick}
        >
          Восстановить
        </Button>
      </Form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?&ensp;<Link to={login}>Войти</Link>
      </p>
    </AuthenticationSection>
  );
}

export default ForgotPassword;
