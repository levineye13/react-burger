import React from 'react';
import { Link } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import AuthenticationSection from '../../components/authentication-section/authentication-section';
import Form from '../../components/form/form';
import { PAGES } from '../../utils/constants';

function ForgotPassword() {
  return (
    <AuthenticationSection title="Восстановление пароля">
      <Form name="forgotPassword">
        <Input type="email" name="email" placeholder="Укажите e-mail" />
        <Button type="primary" htmlType="submit" size="small">
          Восстановить
        </Button>
      </Form>
      <p>
        Вспомнили пароль? <Link to={PAGES.login}>Войти</Link>
      </p>
    </AuthenticationSection>
  );
}

export default ForgotPassword;
