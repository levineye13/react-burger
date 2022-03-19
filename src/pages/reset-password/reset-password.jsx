import React from 'react';
import { Link } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import AuthenticationSection from '../../components/authentication-section/authentication-section';
import Form from '../../components/form/form';
import { PAGES } from '../../utils/constants';

function ResetPassword() {
  return (
    <AuthenticationSection title="Восстановление пароля">
      <Form name="resetPassword">
        <Input
          type="password"
          name="password"
          placeholder="Введите новый пароль"
        />
        <Input type="text" name="code" placeholder="Введите код из письма" />
        <Button type="primary" htmlType="submit" size="small">
          Сохранить
        </Button>
      </Form>
      <p>
        Вспомнили пароль? <Link to={PAGES.login}>Войти</Link>
      </p>
    </AuthenticationSection>
  );
}

export default ResetPassword;
