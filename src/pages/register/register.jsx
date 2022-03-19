import React from 'react';
import { Link } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import AuthenticationSection from '../../components/authentication-section/authentication-section';
import Form from '../../components/form/form';
import { PAGES } from '../../utils/constants';

function Register() {
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
        <Button type="primary" htmlType="submit" size="small">
          Зарегистрироваться
        </Button>
      </Form>
      <p>
        Уже зарегистрированы? <Link to={PAGES.login}>Войти</Link>
      </p>
    </AuthenticationSection>
  );
}

export default Register;
