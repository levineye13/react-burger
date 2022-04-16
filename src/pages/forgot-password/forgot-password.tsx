import React, { FC, ReactElement, useCallback } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Location } from 'history';

import AuthenticationSection from '../../components/authentication-section/authentication-section';
import Form from '../../components/form/form';
import { useForm } from '../../hooks/useForm';
import { PAGES } from '../../utils/constants';
import { clearForm, restorePassword } from '../../services/actions';

const { root, login, resetPassword } = PAGES;

const ForgotPassword: FC = (): ReactElement => {
  const { isAuth, request, failed } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { location, replace } = useHistory<{ from: Location }>();

  const onSubmit = useCallback(() => {
    dispatch(clearForm('forgotPassword'));

    if (!request && !failed) {
      replace({
        pathname: resetPassword,
        state: { from: location },
      });
    }
  }, [request, failed, location, replace]);

  const { handleChange, handleSubmit, values } = useForm(
    'forgotPassword',
    restorePassword,
    { callback: onSubmit }
  );

  if (isAuth) {
    return <Redirect to={location.state?.from || root} />;
  }

  return (
    <AuthenticationSection title="Восстановление пароля">
      <Form name="forgotPassword" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Укажите e-mail"
          onChange={handleChange}
          value={values.email || ''}
        />
        <Button type="primary" htmlType="submit" size="medium">
          Восстановить
        </Button>
      </Form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?&ensp;<Link to={login}>Войти</Link>
      </p>
    </AuthenticationSection>
  );
};

export default ForgotPassword;
