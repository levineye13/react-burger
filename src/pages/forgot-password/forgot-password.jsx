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
        <Button type="primary" htmlType="submit" size="medium">
          Восстановить
        </Button>
      </Form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?&ensp;<Link to={PAGES.login}>Войти</Link>
      </p>
    </AuthenticationSection>
  );
}

export default ForgotPassword;
