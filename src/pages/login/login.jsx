import React from 'react';
import { Link } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import AuthenticationSection from '../../components/authentication-section/authentication-section';
import Form from '../../components/form/form';
import { PAGES } from '../../utils/constants';

const { register, forgotPassword } = PAGES;

function Login() {
  return (
    <AuthenticationSection title="Вход">
      <Form name="login">
        <Input type="email" name="email" placeholder="E-mail" />
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          icon="ShowIcon"
        />
        <Button type="primary" size="small">
          Войти
        </Button>
      </Form>
      <p>
        Вы — новый пользователь? <Link to={register}>Зарегистрироваться</Link>
      </p>
      <p>
        Забыли пароль? <Link to={forgotPassword}>Восстановить пароль</Link>
      </p>
    </AuthenticationSection>
  );
}

export default Login;
