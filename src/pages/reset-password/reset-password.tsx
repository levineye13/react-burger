import React, { FC, ReactElement } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Location } from 'history';

import AuthenticationSection from '../../components/authentication-section/authentication-section';
import Form from '../../components/form/form';
import { useForm } from '../../hooks/useForm';
import { Pages } from '../../utils/constants';
import { clearForm, resetPassword } from '../../services/actions';

const ResetPassword: FC = (): ReactElement => {
  const { isAuth } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { state } = useLocation<{ from: Location }>();
  const { handleChange, handleSubmit, values } = useForm(
    'resetPassword',
    resetPassword,
    {
      callback: () => dispatch(clearForm('resetPassword')),
    }
  );

  if (isAuth || state?.from.pathname !== Pages.ForgotPassword) {
    return <Redirect to={state?.from || Pages.Root} />;
  }

  return (
    <AuthenticationSection title="Восстановление пароля">
      <Form name="resetPassword" onSubmit={handleSubmit}>
        <Input
          type="password"
          name="password"
          placeholder="Введите новый пароль"
          icon="ShowIcon"
          onChange={handleChange}
          value={values.password || ''}
        />
        <Input
          type="text"
          name="code"
          placeholder="Введите код из письма"
          onChange={handleChange}
          value={values.code || ''}
        />
        <Button type="primary" htmlType="submit" size="medium">
          Сохранить
        </Button>
      </Form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?&ensp;<Link to={Pages.Login}>Войти</Link>
      </p>
    </AuthenticationSection>
  );
};

export default ResetPassword;
