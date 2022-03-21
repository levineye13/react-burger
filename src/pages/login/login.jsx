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

        <Button type="primary" size="medium" htmlType="submit">
          Войти
        </Button>
      </Form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?&ensp;
        <Link to={register}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?&ensp;
        <Link to={forgotPassword}>Восстановить пароль</Link>
      </p>
    </AuthenticationSection>
  );
}

export default Login;
